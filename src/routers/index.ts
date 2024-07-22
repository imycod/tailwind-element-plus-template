import {
    createRouter,
    createWebHistory,
} from "vue-router";

import remainingRouter from "./modules/remaining";
import errorRouter from "./modules/error";

import setupRootGuard from "@/routers/guard";

const routerHistory = createWebHistory();

const modules: Record<string, any> = import.meta.glob(
    ["./modules/**/*.ts", "!./modules/**/remaining.ts", "!./modules/**/error.ts"],
    {
        eager: true,
    }
);

/** 原始静态路由（未做任何处理）- 不可更改其结构 -> menu */
export const routes = [];

Object.keys(modules).forEach((key) => {
    routes.push(modules[key].default);
});

/** 不参与菜单的路由 */
export let remainingPaths = []
const initRemainingPaths = () => {
    const routes = [...remainingRouter, ...errorRouter.children]
    remainingPaths =  Object.keys(routes).map(v => {
        if (!routes[v].meta.iframe)  return routes[v].path;
    }).filter(Boolean);
}

initRemainingPaths()

export const router = createRouter({
    history: routerHistory,
    routes: [...routes, ...remainingRouter, errorRouter],
});

setupRootGuard(router)
export default router;
