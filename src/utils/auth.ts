import Cookies from "js-cookie";
import {storageLocal,storageSession} from "@pureadmin/utils";
import {LoginResponse} from "@/utils/type.ts";

export const TokenKey = 'token'
export const sortTokenKey = 'oAuthToken'
export const authorizeTokenKey = 'authorizeToken'
export const userKey = 'userInfo'

export function getItem(key?:string) {
    key = key || userKey;
    return storageSession().getItem(key);
}

export function getToken() {
	return Cookies.get(sortTokenKey)
		? JSON.parse(Cookies.get(sortTokenKey))
		: storageLocal().getItem(userKey);
}

export function setToken(data: LoginResponse) {
    const {accessToken, oAuthToken} = data;

    const expires = 24 * 60 * 60 * 1000;

    const cookieString = JSON.stringify({accessToken, expires, oAuthToken});

    Cookies.set(sortTokenKey, cookieString);
}

export function removeToken() {
    Cookies.remove(sortTokenKey);
    storageLocal().removeItem(userKey);
}

