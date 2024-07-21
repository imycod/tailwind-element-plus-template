import {createIFrameGuard} from "@/routers/guard/createIFrameGuard.ts";
import {createProgressGuard} from "@/routers/guard/createProgressGuard.ts";
import {createStateGuard} from "@/routers/guard/createStateGuard.ts";
import {createAuthGuard} from "@/routers/guard/createAuthGuard.ts";
import {createLoggerGuard} from "@/routers/guard/createLoggerGuard.ts";
import {routeTimes} from "@/routers/log.ts";

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