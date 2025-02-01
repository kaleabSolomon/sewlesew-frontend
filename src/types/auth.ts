export interface SignInResponse {
  access_token: string;
  refresh_token: string;
}

export interface jwtPayload {
  sub: string;
  identifier: string;
  isActive: boolean;
  isVerified: boolean;
  role: string;
}
