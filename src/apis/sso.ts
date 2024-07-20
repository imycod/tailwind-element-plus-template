export const login = (data: any) => http.post('/api/sso/login', data)
export const authorize = (data: any, config: any) => http.post('/api/sso/auth', data, config)