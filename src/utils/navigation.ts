import {isHttp} from "@/utils/utils.ts";
import {router} from "@/routers"

type RedirectOptions = {
    query?: any;
    isReplace?: boolean;
}
export function redirectTo(path: string, options?: RedirectOptions) {
    const query = options?.query;
    const isReplace = options?.isReplace || true;

    if (isHttp(path)) {
        window.location.href = path
        return
    }

    if (isReplace) {
        router.replace({
            path,
            query,
        });
    } else {
        router.push({
            path,
            query,
        });
    }
}