export const useLoggerStore = defineStore('logger', () => {
    const histories = reactive({
        path: '', // 在哪个页面
        type: '', // 什么类型
        target: '', // 什么元素
        timestamp: '', // 时间
        apiStack: [{
            url: '', // 请求地址
            method: '', // 请求方法
            params: {}, // 请求参数
            status: '', // 请求状态
        }] 
    })

    const toLog = (options) => {
        const {path, type, target, timestamp, apiStack} = options
        histories.path = path
        histories.type = type
        histories.target = target
        histories.timestamp = timestamp
        histories.apiStack = apiStack
    }
    return {
        histories,
        toLog
    }
})

