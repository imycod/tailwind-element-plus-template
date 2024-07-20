import {isHttp} from "@/utils/utils.ts";

export function redirectTo(path: string, query?: any) {
    if (isHttp(path)){
        window.location.href = path
    }else{
        const router = useRouter()
        router.replace({
            path,
            query,
        });
    }
}