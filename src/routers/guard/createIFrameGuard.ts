import {isObject} from "radash"
import {useUserStoreHook} from "@/stores/modules/user.ts";
import {remainingPaths} from "@/routers";
export function createIFrameGuard(router,logger) {
    router.beforeEach(async (to, from, next) => {
        // if (remainingPaths.includes(to.path)){
        //     next()
        //     return
        // }
        if (to.meta.iframe || isIframe()) {
            console.log('createIFrameGuard')
            const userInfo = getItem()
            if (!isObject(userInfo)){
                try {
                    await useUserStoreHook().getUserInfo()
                }catch (error){
                    console.warn(error)
                    logger[to.path] = {
                        ...logger[to.path],
                        error
                    }
                    next('/error/500')
                }
            }
        }
        next()
    });
}