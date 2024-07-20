export type LoginBody = {
    username: string,
    password: string,
}

export  interface LoginResponse {
    accessToken: string,
    oAuthToken: string,
}

export interface AuthResponse extends LoginResponse{
    idmUserId:string,
    idmUserName:string,
}