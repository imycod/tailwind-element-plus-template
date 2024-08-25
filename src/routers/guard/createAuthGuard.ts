/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-07-21 17:59:34
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-08-25 11:26:13
 * @FilePath: \api-gatewayd:\code\item-workspace\tailwind-element-plus-template\src\routers\guard\createAuthGuard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
            next()
            return
        }
        const userStore = useUserStoreHook()
        // const tokens = getToken()
        // if (!tokens?.oAuthToken) {
        //     redirectTo('/login')
        //     return
        // }
        // const token = getSessionItem(tokenKey)
        // if (!token){
        //     await userStore.authorize(tokens)
        // }
        // // must be oAuthToken but pass it all system here support 请求携带端token
        if (!userStore.userInfo) {
            // userStore.getUserInfo().then(next).catch(()=>redirectTo('/error/500'))
            userStore.getUserInfo()
        }
        next()
    });
}