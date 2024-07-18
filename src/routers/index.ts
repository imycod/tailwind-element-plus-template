import {
  createRouter,
  createWebHistory,
  type RouteComponent,
  type Router,
} from "vue-router";

import { usePermissionStoreHook } from "@/stores/modules/permission";
import NProgress from "@/utils/progress";
import { buildHierarchyTree } from "@/utils/tree.ts";

import remainingRouter from "./modules/remaining";
import {
  ascending,
  getTopMenu,
  initRouter,
  isOneOfArray,
  getHistoryMode,
  findRouteByPath,
  formatTwoStageRoutes,
  formatFlatteningRoutes,
} from "./utils";

const routerHistory = createWebHistory();

const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts", "!./modules/**/error.ts"],
  {
    eager: true,
  }
);

/** 原始静态路由（未做任何处理） */
const routes = [];

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = ascending(
  routes.flat(Infinity)
).concat(...remainingRouter);

/** 不参与菜单的路由 */
export const remainingPaths = Object.keys(remainingRouter).map(v => {
  return remainingRouter[v].path;
});

/** 重置路由 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name, meta } = route;
    if (name && router.hasRoute(name) && meta?.backstage) {
      router.removeRoute(name);
      router.options.routes = formatTwoStageRoutes(
        formatFlatteningRoutes(
          buildHierarchyTree(ascending(routes.flat(Infinity)))
        )
      );
    }
  });
}

export const router = createRouter({
  history: routerHistory,
  routes,
});

router.beforeEach((to, _from, next) => {
  NProgress.start();
  // refresh
  if (
      usePermissionStoreHook().wholeMenus.length === 0 &&
      to.path !== "/login"
  ) {
    initRouter()
  }
  next()
})
router.afterEach(() => {
  NProgress.done();
});

export default router;
