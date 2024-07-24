import Cookies from "js-cookie";
import {storageLocal, storageSession} from "@pureadmin/utils";
import {AuthResponse, LoginResponse} from "@/utils/type.ts";

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
    return storageSession().getItem(key)
}
export function removeSession() {
    storageSession().clear()
}
export function getToken(): AuthResponse{
    return Cookies.get(oAuthTokenKey)
        ? JSON.parse(Cookies.get(oAuthTokenKey))
        : null;
}

export function setToken(data: AuthResponse) {
    const {oAuthToken} = data;

    const expires = new Date().getTime() + 24 * 60 * 60 * 1000; // 过期时间为当前时间 + 24 小时

    const cookieString = JSON.stringify({expires, oAuthToken});

    Cookies.set(oAuthTokenKey, cookieString);
}

export function removeToken() {
    Cookies.remove(oAuthTokenKey);
    storageLocal().removeItem(userKey);
}

