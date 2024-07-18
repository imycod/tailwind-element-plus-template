import { defineStore } from "pinia";
import {
  store,
  ascending,
  filterTree,
  constantMenus,
  filterNoPermissionTree,
  formatFlatteningRoutes
} from "../utils";

export const usePermissionStore = defineStore({
  id: "pass-permission",
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
  }),
  actions: {
    /** 组装整体路由生成的菜单 */
    handleWholeMenus(routes: any[]) {
      this.wholeMenus = filterNoPermissionTree(
        filterTree(ascending(this.constantMenus.concat(routes)))
      );
      this.wholeMenus = this.wholeMenus.filter(v => v.path !== "/error");
      this.flatteningRoutes = formatFlatteningRoutes(
        this.constantMenus.concat(routes)
      );
    },
  }
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
