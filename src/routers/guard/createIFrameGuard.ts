import {isObject} from "radash"
export function createIFrameGuard(router) {
    router.beforeEach(async (to, from, next) => {
        if (to.meta.iframe || isIframe()) {
            const userInfo = getItem()
            if (!isObject(userInfo)){

            }
        }
        next()
    });
}