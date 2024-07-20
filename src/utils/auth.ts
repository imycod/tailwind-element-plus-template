import Cookies from "js-cookie";
import {storageLocal} from "@pureadmin/utils";
import {LoginResponse} from "@/utils/type.ts";

const TokenKey = 'token'
const userKey = 'userInfo'

export function getToken() {
	return Cookies.get(TokenKey)
		? JSON.parse(Cookies.get(TokenKey))
		: storageLocal().getItem(userKey);
}

export function setToken(data: LoginResponse) {
    const {accessToken, oAuthToken} = data;

    const expires = 24 * 60 * 60 * 1000;

    const cookieString = JSON.stringify({accessToken, expires, oAuthToken});

    Cookies.set(TokenKey, cookieString);
}

export function removeToken() {
    Cookies.remove(TokenKey);
    storageLocal().removeItem(userKey);
}

