import {remainingPaths} from "@/routers";

export function createAuthGuard(router) {
    router.beforeEach(async (to, from, next) => {
        if (remainingPaths.includes(to.path)){
            next()
            return
        }
        if (to.meta.skipAuth){
            next();
            return
        }
        console.log('auth')
        next();
    });
}