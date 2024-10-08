import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer,
} from "axios";
import type {
  IHttpError,
  RequestMethods,
  IHttpResponse,
  IHttpRequestConfig,
} from "./types.d";
import { stringify } from "qs";
import NProgress from "../progress";
import { getToken } from "@/utils/auth.ts";
import { isFunction, retry } from "radash";
import { useLoggerStore } from "@/stores/modules/logger.ts";
import { logger } from "./logger";

class CustomHttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*", // 默认请求头接受类型
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    'Client-Id':import.meta.env.VITE_APP_CLIENT_ID,
    'Client-Secret':import.meta.env.VITE_APP_CLIENT_SECRET,
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
};

class IHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** `token`过期后，暂存待执行的请求 */
  private static requests = [];

  /** 防止重复刷新`token` */
  private static isRefreshing = false;

  /** 初始化配置对象 */
  private static initConfig: IHttpRequestConfig = {};

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 重连原始请求 */
  private static retryOriginalRequest(config: IHttpRequestConfig) {
    return new Promise((resolve) => {
      IHttp.requests.push((token: string) => {
        config.headers["Authorization"] = token;
        resolve(config);
      });
    });
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    IHttp.axiosInstance.interceptors.request.use(
      async (config: IHttpRequestConfig): Promise<any> => {
        if (!config.url.includes("/local")) {
          useLoggerStore().toLogger({
            api: config.url,
          });
        }
        // 开启进度条动画
        NProgress.start();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (isFunction(config.beforeRequestCallback)) {
          config.beforeRequestCallback(config);
          return config;
        }
        if (IHttp.initConfig.beforeRequestCallback) {
          IHttp.initConfig.beforeRequestCallback(config);
          return config;
        }
        /** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
        const whiteList = ["/refresh-token", "/login"];
        return whiteList.some((url) => config.url.endsWith(url))
          ? config
          : new Promise((resolve) => {
              const data = getToken();
              if (data) {
                const now = new Date().getTime();
                const expired = parseInt(data.expires) - now <= 0;
                // if (expired) {
                //     if (!IHttp.isRefreshing) {
                //         IHttp.isRefreshing = true;
                //         // token过期刷新
                //         useUserStoreHook()
                //           .handRefreshToken({ refreshToken: data.refreshToken })
                //           .then(res => {
                //             const token = res.data.accessToken;
                //             config.headers["Authorization"] = token;
                //             IHttp.requests.forEach(cb => cb(token));
                //             IHttp.requests = [];
                //           })
                //           .finally(() => {
                //             IHttp.isRefreshing = false;
                //           });
                //     }
                //     resolve(IHttp.retryOriginalRequest(config));
                // } else {
                config.headers["Authorization"] = data.oAuthToken;
                resolve(config);
                // }
              } else {
                resolve(config);
              }
            });
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = IHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: IHttpResponse) => {
        const $config = response.config;
        // 关闭进度条动画
        NProgress.done();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (isFunction($config.beforeResponseCallback)) {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (IHttp.initConfig.beforeResponseCallback) {
          IHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        const contentType = response.headers["content-type"];
        const accept = $config.headers["Accept"];
        if (!accept.includes("*/*")) {
          if (contentType && contentType.includes(accept)) {
            return response.data;
          } else {
            throw new CustomHttpError("接口返回类型错误", 50001);
          }
        }
        return response.data;
      },
      (error: IHttpError) => {
        const $error = error;

        if (process.env.LOGGER_SERVER_OPEN) {
          logger($error);
        }

        if ($error.response.status === 401) {
          useEventBus('login').emit()
        }

        $error.isCancelRequest = Axios.isCancel($error);
        // 关闭进度条动画
        NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: IHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as IHttpRequestConfig;
    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      IHttp.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /** 单独抽离的`post`工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: IHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("post", url, params, config);
  }

  /** 单独抽离的`get`工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: IHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("get", url, params, config);
  }
}

const http = new IHttp();

// const request = http.request

// http.request = async (method, url, param, axiosConfig) => {
//     if (typeof axiosConfig?.retry === 'boolean' && !axiosConfig?.retry) {
//         return request(method, url, param, axiosConfig)
//     } else {
//         const retryConfig = axiosConfig?.retry || {times: 10, delay: 1000}
//         return await retry(retryConfig, (exit) => {
//             return request(method, url, param, axiosConfig)
//                 .catch((error) => {

//                     if (error.statusCode === 50001) {
//                         exit(error); // Stop retrying
//                     }
//                     throw error; // Continue retrying
//                 })
//         })
//     }
// }

export { http, CustomHttpError };
