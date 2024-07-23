import {createIFrameGuard} from "@/routers/guard/createIFrameGuard.ts";
import {createProgressGuard} from "@/routers/guard/createProgressGuard.ts";
import {createStateGuard} from "@/routers/guard/createStateGuard.ts";
import {createAuthGuard} from "@/routers/guard/createAuthGuard.ts";
import {createLoggerGuard} from "@/routers/guard/createLoggerGuard.ts";
import {routeTimes} from "@/routers/log.ts";

/**
 * 0. login as admin deprecate to my_item, SP.8 客户一键登录移动只官网不需要考虑支持
 * 1. iframe页不需要鉴权，只需要查看userInfo
 * 2. 看Cookies oAuthToken如果有不需要展示Login页，如果没有去到login页登录（前提是登录了后别人没有手动移除掉cookie里得）
 * 3. 系统内部页需要经过auth guard -》
 *
 *    remainingPaths 和 meta 上得信息不同得是， remainingPaths是真正得白名单这些白名单用于跳过StateGuard，IFrameGuard，AuthGuard。
 * 但iframe需要在StateGuard，IFrameGuard获得一些额外得信息（如果需要得话），所以不可等同,StateGuard 御用做一些初始化得信息，比如清理缓存，存储信息等
 *
 * Guard守卫逻辑初次（除remainingPaths、iframe）会执行 1. logger 2. progress 3. state 4. auth
 * Guard 初次 iframe会执行  1. logger 2. progress 3. state 4. iframe
 * Guard 初次 remainingPaths会执行 1. logger 2. progress
 * 内部导航会执行 （除remainingPaths、iframe） 1. logger 2. progress 4. auth
 *
 */
export default function setupRootGuard(router) {
    // global variable
    let isInit = true

    console.log('setupRootGuard')
    createLoggerGuard(router)
    createProgressGuard(router)
    createStateGuard(router, isInit)
    createIFrameGuard(router, routeTimes)
    createAuthGuard(router, routeTimes)
}