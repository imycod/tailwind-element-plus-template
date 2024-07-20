import {
  createRouter,
  createWebHistory,
  type RouteComponent,
  type Router,
} from "vue-router";

import NProgress from "@/utils/progress";
import remainingRouter from "./modules/remaining";


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
export const remainingPaths = Object.keys(remainingRouter).map(v => {
  return remainingRouter[v].path;
});

export const router = createRouter({
  history: routerHistory,
  routes:[...routes, ...remainingRouter],
});

router.beforeEach((to, _from, next) => {
  NProgress.start();
  next()
})
router.afterEach(() => {
  NProgress.done();
});

export default router;
