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

export interface SignupData {
  firstName: string;
  lastName: string;
  identifier: string;
  dateOfBirth: string;
  password: string;
  passwordConfirm: string;
}
