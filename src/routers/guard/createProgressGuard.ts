import NProgress from "@/utils/progress";

export function createProgressGuard(router) {
    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        console.log('1')
        next();
    });
    router.afterEach((to, from) => {
        NProgress.done();
    });
}