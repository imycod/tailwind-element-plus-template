import {routeTimes, logTimeOnPage} from "../log.ts"

export function createLoggerGuard(router) {
    router.beforeEach((to, from, next) => {
        logTimeOnPage(from, to);
        const {entryTime, exitTime, timeSpent,error} = routeTimes[to.path];
        // const redirectedFrom = to.redirectedFrom;
        // if (redirectedFrom){
        //     const redirectedFromLog = routeTimes[redirectedFrom.path] || {};
        //     console.log('redirectedFromLog---',redirectedFromLog)
        //     if (redirectedFromLog.error) {
        //         console.log(`用户进入失败 ${redirectedFrom.path} 在 ${new Date(redirectedFromLog['timeSpent']).toLocaleString()}`)
        //     }
        // }
        if (to.path !== from.path) {
            console.log(`用户开始进入 ${to.path} 在 ${new Date(entryTime).toLocaleString()}`);
        }
        next()
    })
    router.afterEach((to, from) => {
        const {entryTime, exitTime, timeSpent, error} = routeTimes[to.path] || {};
        const fromlog = routeTimes[from.path] || {};
        if (to.path !== from.path) {
            console.log(`用户进入成功 ${to.path} 在 ${new Date(entryTime).toLocaleString()}`);
            const redirectedFrom = to.redirectedFrom;
            if (redirectedFrom){
                const redirectedFromLog = routeTimes[redirectedFrom.path] || {};
                if (redirectedFromLog.error) {
                    console.log(`用户进入${redirectedFrom.path}失败了,花费了 ${redirectedFromLog['timeSpent'] / 1000}s`)
                }
            }else{
                console.log(`用户离开了 ${from.path} 在 ${new Date(fromlog['exitTime']).toLocaleString()}`);
                console.log(`用户花费了 ${fromlog['timeSpent'] / 1000} s 在 ${from.path}`);
            }
        }
    })
}