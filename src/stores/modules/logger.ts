export const useLoggerStore = defineStore('logger', () => {
    const histories = {
        path: '', // 在哪个页面
        type: '', // 什么元素
        target: '', // 什么名字
        event: '', // 什么事件
        time: '', // 时间
        apiStack: [{
            url: '', // 请求地址
            method: '', // 请求方法
            params: {}, // 请求参数
            status: '', // 请求状态
        }] // 请求状态
    }
})

