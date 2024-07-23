export const login = (body: any) => http.post('/api/idm-app/user/sso/login', body,{
    retry:false
})
export const authorize = (body: any, config: any) => http.post('/api/idm-app/user/sso/auth', body, config)
export const logout = (body: any) => http.post('/idm-app/user/sso/logout', body);