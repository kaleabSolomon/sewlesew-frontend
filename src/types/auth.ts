export interface SignInResponseSuccess {
  access_token: string;
  refresh_token: string;
}
export interface AuthError {
  error: string;
  message: string;
  statusCode: number;
}

export interface jwtPayload {
  sub: string;
  identifier: string;
  isActive: boolean;
  isVerified: boolean;
  role: string;
}

export interface signinData {
  identifier: string;
  password: string;
}
