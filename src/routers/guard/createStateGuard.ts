import {remainingPaths} from "@/routers";

export function createStateGuard(router,isInit) {
    router.beforeEach(async (to, from, next) => {
        if (remainingPaths.includes(to.path)){
            next()
            return
        }
        if (isInit){

            console.log('2')
            isInit = false
        }
        next();
    });
}