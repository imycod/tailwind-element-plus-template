export const useLoggerStore = defineStore("logger", () => {
  const histories = reactive({
    path: "", // 在哪个页面
    type: "", // 什么类型
    target: "", // 什么元素
    targetName: "", // 元素名称
    timestamp: "", // 时间
    api: "", // 当前事件所触发的接口
    scope: null, // 范围
    // apiStack: [
    //   {
    //     url: "", // 请求地址
    //     method: "", // 请求方法
    //     params: {}, // 请求参数
    //     status: "", // 请求状态
    //   },
    // ],
  });

  const toLogger = (options) => {
    Object.assign(histories, options);
  };
  return {
    histories,
    toLogger,
  };
});
