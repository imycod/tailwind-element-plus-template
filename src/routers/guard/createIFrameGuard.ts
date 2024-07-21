import {isObject} from "radash"
import {useUserStoreHook} from "@/stores/modules/user.ts";
import {remainingPaths} from "@/routers";
export function createIFrameGuard(router) {
    router.beforeEach(async (to, from, next) => {
        // if (remainingPaths.includes(to.path)){
        //     next()
        //     return
        // }
        console.log('3')
        if (to.meta.iframe || isIframe()) {
            const userInfo = getItem()
            if (!isObject(userInfo)){
                try {
                    await useUserStoreHook().getUserInfo()
                }catch (error){
                    console.warn(error)
                    next('/error/500')
                }
            }
        }
        next()
    });
}