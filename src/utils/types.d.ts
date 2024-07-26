export type LoginBody = {
  username: string;
  password: string;
};

export interface AuthResponse extends LoginResponse {
  oAuthToken: string;
}

export interface LoginResponse {
  idmUserId: string;
  accessToken: string;
}
