import {removeToken, getToken} from "@/utils/auth.ts";
import {AuthResponse, LoginBody, LoginResponse} from "@/utils/type.ts";
import {redirectTo} from "@/utils/navigation.ts";
import {logout} from "@/apis/sso.ts";

const USER_FROZEN = 46013;
const NO_PERMISSION = 500;

const browser = getAgent()
const system = {
    channel: 'Web',
    platform: 'Web',
    device: `${browser.getOS().name} ${browser.getOS().version} ${browser.getBrowser().name}-${browser.getBrowser().version}`,
}
const applicationCode = 'pass';
export const toLogin = (body: LoginBody) => {
    return new Promise<LoginResponse>(async (resolve, reject) => {
        try {
            const result = await login({
                ...body,
                ...system,
                applicationCode,
            })
            // 冻结去官网
            if (result.code === USER_FROZEN) {
                ElMessage.warning(result.error)
                redirectTo('/error/403')
            } else {
                resolve(result)
            }
        } catch (error) {
            // 是否冻结
            reject(error)
        }
    })
}

export const toAuth = () => {
    const {accessToken} = getToken()

    const route = useRoute();
    const query = route.query;
    const code = query.applicationCode || 'pass';

    const {locale, source} = query;
    return new Promise<AuthResponse>(async (resolve, reject) => {
        try {
            const result = await authorize({
                ...system,
            }, {
                headers: {
                    'application-code': code,
                    Authorization: `${accessToken}`,
                }
            })
            const redirect_url = query.redirect_url;

            if (redirect_url) {
                // other
                const parsed = parseUrlSearch(decodeURIComponent(redirect_url));
                const queryString = Object.keys(parsed.query)
                    .map((key) => {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(parsed.query[key]);
                    })
                    .join('&');
                const path = `${parsed.url}?token=${result.accessToken}&${queryString}&oauth=true&userId=${result.idmUserId}&userName=${result.idmUserName}`;
                redirectTo(path)
            } else {
                // local
                resolve(result)
            }
        } catch (error) {
            if (error.response.status === NO_PERMISSION) {
                // 没权限
                redirectTo('/error/403')
            } else {
                // 过期了
                removeToken()
            }
            reject(error)
        }
    })
}


export function toLogout() {
    return new Promise(async (resolve, reject) => {
        const {oAuthToken} = getToken()
        try {
            await logout({
                ...system,
                oauthToken: oAuthToken,
            })
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}