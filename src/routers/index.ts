import {
  createRouter,
  createWebHistory,
  type RouteComponent,
} from "vue-router";

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

console.log('routes--',routes)

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

export default router;
