export function createStateGuard(router) {
    router.beforeEach(async (to, from, next) => {
        next();
    });
}