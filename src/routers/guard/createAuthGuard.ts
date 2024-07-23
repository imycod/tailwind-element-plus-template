import {remainingPaths} from "@/routers";
import {useUserStoreHook} from "@/stores/modules/user.ts";
import {getSessionItem, getToken} from "@/utils/auth.ts";
export function createAuthGuard(router, logger) {
    router.beforeEach(async (to, from, next) => {
        if (remainingPaths.includes(to.path)) {
            next()
            return
        }
        if (to.meta.skipAuth) {
            next();
            return
        }
        const userStore = useUserStoreHook()
        const {oAuthToken, accessToken} = getToken()
        if (!oAuthToken) {
            redirectTo('/login')
            return
        }
        const token = getSessionItem(tokenKey)
        if (!token){
            await userStore.authorize()
        }
        // must be oAuthToken but pass it all system here support 请求携带端token
        if (!userStore.userInfo) {
            userStore.getUserInfo().then(next).catch(()=>redirectTo('/error/500'))
        }
    });
}