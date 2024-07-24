import {defineStore} from "pinia";
// @ts-ignore
import {getUserInfo} from "@/apis/user";
import {toLogin, toAuth, toLogout} from "@/utils/sso.ts"
import {setToken, removeToken, store} from "../utils";
import {LoginResponse} from "@/utils/type.ts";

export const useUserStore = defineStore({
    id: "item-user",
    state: () => ({
        username: "",
        roles: [],
        permissions: [],
        userId: "",
        accountView: null,
        userInfo: null,
        companyFacility: {},
    }),
    actions: {
        /** 存储用户名 */
        SET_USERNAME(username: string) {
            this.username = username;
        },
        /** 存储角色 */
        SET_ROLES(roles: Array<string>) {
            this.roles = roles;
        },
        SET_ACCOUNTVIEW(accountView: any) {
            this.accountView = accountView;
        },
        SET_USERINFO(userInfo: any) {
            this.userInfo = userInfo;
        },
        SET_IDM_USERID(userId: string) {
            this.userId = userId;
        },
        SET_COMPANY_FACILITY(companyFacility: any) {
            this.companyFacility = companyFacility;
        },
        /** 登入 */
        loginByPassword(data): Promise<LoginResponse> {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await toLogin(data)
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        },
        /** 前端登出（不调用接口） */
        logout() {
            toLogout().finally(() => {
                this.username = "";
                this.roles = [];
                removeToken();
                removeSession();
                redirectTo('/login')
            })
        },
        /** sso/auth */
        authorize(data) {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await toAuth(data.accessToken)
                    setToken(result)
                    setSessionItem(tokenKey,result.accessToken)
                    console.log('result----', result)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            });
        },
        getUserInfo() {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await getUserInfo();
                    this.SET_ACCOUNTVIEW(result.accountView);
                    this.SET_IDM_USERID(result.accountView.idmUserId);
                    this.SET_USERINFO(result);
                    let company = result.companies[0];
                    let companyFacility = {
                        companyId: company?.id,
                        facilityId: null,
                        company: company,
                        facility: {},
                    };
                    this.SET_COMPANY_FACILITY(companyFacility);
                    resolve(result);
                } catch (error) {
                    console.log('error', error)
                    reject(error);
                }
            });
        }
    }
});

export function useUserStoreHook() {
    return useUserStore(store);
}
