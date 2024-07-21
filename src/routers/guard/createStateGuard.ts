import {remainingPaths} from "@/routers";

export function createStateGuard(router,isInit) {
    router.beforeEach(async (to, from, next) => {
        if (remainingPaths.includes(to.path)){
            next()
            return
        }
        if (isInit){
            // 清理缓存
            // 初始化数据 比如header query数据
            console.log('2')
            isInit = false
        }
        next();
    });
}