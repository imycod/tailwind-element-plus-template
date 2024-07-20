import {removeToken, getToken, setToken} from "@/utils/auth.ts";
import {AuthResponse, LoginBody, LoginResponse} from "@/utils/type.ts";
import {redirectTo} from "@/utils/navigation.ts";

const browser = getAgent()
const moreInfo = {
    channel: 'Web',
    platform: 'Web',
    device: `${browser.getOS().name} ${browser.getOS().version} ${browser.getBrowser().name}-${browser.getBrowser().version}`,
}
const applicationCode = 'pass';

export const tologin = async (body: LoginBody): Promise<LoginResponse> => {
    try {
        const result = await login({
            ...body,
            ...moreInfo,
            applicationCode,
        })
        setToken(result)
        return result
    } catch (error) {

    }
}

export const toAuth = async () => {
    const {accessToken} = getToken()
    const route = useRoute()
    const code = route.query.applicationCode || applicationCode;
    const redirect_url = route.query.redirect_url;
    const {locale, source} = route.query;
    try {
        const result: AuthResponse = await authorize({
            ...moreInfo,
        }, {
            headers: {
                'application-code': code,
                Authorization: `${accessToken}`,
            }
        })
        if (redirect_url) {
            // other
            const parsed = parseUrlSearch(decodeURIComponent(redirect_url));
            const queryString = Object.keys(parsed.query)
                .map((key) => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(parsed.query[key]);
                })
                .join('&');
            const path = `${parsed.url}?token=${result.accessToken}&${queryString}&oauth=true&userId=${result.idmUserId}&userName=${result.idmUserName}`;
            redirectTo(path, {
                redirect_url: parsed.url,
                applicationCode,
                locale,
                source, // my_item logo mark
                ...parsed.query,
            }, true)
        } else {
            // local
            return result
        }
    } catch (error) {
        if (error.response.status === 500) {
            // 没权限
            const router = useRouter();
            router.replace('/403')
        } else {
            // 过期了
            removeToken()
        }
    }
}