import {remainingPaths} from "@/routers";

export function createStateGuard(router) {
    router.beforeEach(async (to, from, next) => {
        if (remainingPaths.includes(to.path)){
            next()
            return
        }
        console.log('2')
        next();
    });
}