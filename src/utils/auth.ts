import Cookies from "js-cookie";
import {storageLocal, storageSession} from "@pureadmin/utils";
import {LoginResponse} from "@/utils/type.ts";

export const tokenKey = 'token'
export const oAuthTokenKey = 'oAuthToken'
export const authorizeTokenKey = 'authorizeToken'
export const userKey = 'userInfo'

export function getItem(key?: string) {
    key = key || userKey;
    return storageSession().getItem(key);
}

export function setSessionItem(key: string, value: any) {
    if (!key) {
        throw new Error('请输入session key')
    }
    storageSession().setItem(key, value)
}

export function getSessionItem(key) {
    return  storageSession().getItem(key)
}

export function getToken() {
    return Cookies.get(oAuthTokenKey)
        ? JSON.parse(Cookies.get(oAuthTokenKey))
        : {
            accessToken: '',
            oAuthToken: '',
        };
}

export function setToken(data: LoginResponse) {
    const {accessToken, oAuthToken} = data;

    const expires = 24 * 60 * 60 * 1000; // 一天过期

    const cookieString = JSON.stringify({accessToken, expires, oAuthToken});

    Cookies.set(oAuthTokenKey, cookieString);
}

export function removeToken() {
    Cookies.remove(oAuthTokenKey);
    storageLocal().removeItem(userKey);
}

