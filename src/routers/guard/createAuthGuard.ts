export function createAuthGuard(router) {
    router.beforeEach(async (to, from, next) => {
        if (to.meta.skipAuth){
            next();
            return
        }
        console.log('auth')
        next();
    });
    router.afterEach((to, from) => {

    });
}