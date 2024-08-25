/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-07-20 17:00:58
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-08-25 11:29:52
 * @FilePath: \api-gatewayd:\code\item-workspace\tailwind-element-plus-template\src\apis\sso.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const login = (body: any) => http.post('/auth/login', body)
export const authorize = (body: any, config: any) => http.post('/api/idm-app/user/sso/auth', body, config)
export const logout = (body: any) => http.post('/api/idm-app/user/sso/logout', body,{
    retry:false,
});