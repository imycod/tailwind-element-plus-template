import Cookies from "js-cookie";
import { useSessionStorage } from "@vueuse/core";
import type { AuthResponse } from "@/utils/types.d";

export const tokenKey = "token";
export const oAuthTokenKey = "oAuthToken";
export const authorizeTokenKey = "authorizeToken";
export const userKey = "userInfo";

export function getItem(key?: string) {
  key = key || userKey;
  return useSessionStorage(key, false);
}

export function setSessionItem(key: string, value: any) {
  if (!key) {
    throw new Error("请输入session key");
  }
  useSessionStorage(key, value);
}

export function getSessionItem(key) {
  return useSessionStorage(key, false);
}
export function removeSession(key) {
  useSessionStorage(key,false).value = null
}
export function getToken(): AuthResponse {
  return Cookies.get(oAuthTokenKey)
    ? JSON.parse(Cookies.get(oAuthTokenKey))
    : null;
}

export function setToken(data: AuthResponse) {
  const { oAuthToken } = data;

  const expires = new Date().getTime() + 24 * 60 * 60 * 1000; // 过期时间为当前时间 + 24 小时

  const cookieString = JSON.stringify({ expires, oAuthToken });

  Cookies.set(oAuthTokenKey, cookieString);
}

export function removeToken() {
  Cookies.remove(oAuthTokenKey);
  useStorage(userKey, null)
}
