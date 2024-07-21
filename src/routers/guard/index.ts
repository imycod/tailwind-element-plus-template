import {createIFrameGuard} from "@/routers/guard/createIFrameGuard.ts";
import {createProgressGuard} from "@/routers/guard/createProgressGuard.ts";
import {createStateGuard} from "@/routers/guard/createStateGuard.ts";
import {createAuthGuard} from "@/routers/guard/createAuthGuard.ts";

export default function setupRootGuard(router) {
    // global variable
    let isInit = true
    console.log('setupRootGuard')
    createProgressGuard(router)
    createStateGuard(router,isInit)
    createIFrameGuard(router)
    createAuthGuard(router)
}