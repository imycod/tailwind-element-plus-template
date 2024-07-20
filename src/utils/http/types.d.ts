import type {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig
} from "axios";

export type resultType = {
  accessToken?: string;
};

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface IHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface IHttpResponse extends AxiosResponse {
  config: IHttpRequestConfig;
}

export interface IHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: IHttpRequestConfig) => void;
  beforeResponseCallback?: (response: IHttpResponse) => void;
}

export default class IHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: IHttpRequestConfig
  ): Promise<T>;
  post<T, P>(
    url: string,
    params?: P,
    config?: IHttpRequestConfig
  ): Promise<T>;
  get<T, P>(
    url: string,
    params?: P,
    config?: IHttpRequestConfig
  ): Promise<T>;
}
