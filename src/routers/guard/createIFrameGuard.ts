import {isObject} from "radash"
import {useUserStoreHook} from "@/stores/modules/user.ts";
export function createIFrameGuard(router) {
    router.beforeEach(async (to, from, next) => {
        if (to.meta.iframe || isIframe()) {
            const userInfo = getItem()
            if (!isObject(userInfo)){
                try {
                    await useUserStoreHook().getUserInfo()
                }catch (error){
                    console.warn(error)
                    next('/500')
                }
            }
        }
        next()
    });
}