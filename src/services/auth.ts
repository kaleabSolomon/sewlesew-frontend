import Cookie from "js-cookie";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import {
  AuthError,
  jwtPayload,
  signinData,
  SignInResponseSuccess,
  SignupData,
} from "@/types/auth";
import { isValidEmail } from "@/utils/validators";
import { decodeToken } from "@/utils/auth";

export const signIn = async (
  signinData: signinData,
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void,
  setUser: (user: jwtPayload) => void
) => {
  onIsLoading(true); // Indicate that the request has started

  try {
    // Determine whether identifier is an email or phone number
    const identifierBody = isValidEmail(signinData.identifier)
      ? { email: signinData.identifier }
      : { phoneNumber: signinData.identifier };

    const reqBody = {
      ...identifierBody,
      password: signinData.password,
    };

    // Make API request
    const { data } = await axiosInstance.post<SignInResponseSuccess>(
      "/auth/local/signin",
      reqBody
    );

    // Ensure successful authentication
    if (!data.access_token || !data.refresh_token) {
      throw new Error("Invalid response from server");
    }

    // Store tokens securely in cookies
    Cookie.set("access_token", data.access_token, {
      secure: true,
      sameSite: "Strict",
    });
    Cookie.set("refresh_token", data.refresh_token, {
      secure: true,
      sameSite: "Strict",
    });

    const user = decodeToken("access_token");
    if (user) setUser(user);

    return data;
  } catch (error) {
    onIsLoading(false); // Stop loading on error

    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data as AuthError;
      onError(errData.message || "Authentication failed.");
      console.error("Sign-in error:", errData);
    } else {
      onError("An unexpected error occurred. Could not sign you in.");
      console.error("Unexpected sign-in error:", error);
    }
  } finally {
    onIsLoading(false);
  }
};

export const signUp = async (
  signupData: SignupData,
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void,
  setUser: (user: jwtPayload) => void
) => {
  onIsLoading(true); // Indicate the request has started

  try {
    // Determine whether identifier is an email or phone number
    const identifierBody = isValidEmail(signupData.identifier)
      ? { email: signupData.identifier }
      : { phoneNumber: signupData.identifier };

    const reqBody = {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      dateOfBirth: signupData.dateOfBirth,
      password: signupData.password,
      passwordConfirm: signupData.passwordConfirm,
      ...identifierBody,
    };

    // Make API request
    const { data } = await axiosInstance.post("/auth/local/signup", reqBody);
    // Store tokens securely in cookies
    Cookie.set("access_token", data.access_token, {
      secure: true,
      sameSite: "Strict",
    });
    Cookie.set("refresh_token", data.refresh_token, {
      secure: true,
      sameSite: "Strict",
    });

    const user = decodeToken(data.access_token);

    if (user) setUser(user);

    return data; // Return response data on success
  } catch (error) {
    onIsLoading(false); // Stop loading on error

    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data as AuthError;
      onError(errData.message || "Sign-up failed.");
      console.error("Sign-up error:", errData);
    } else {
      onError("An unexpected error occurred. Could not sign you up.");
      console.error("Unexpected sign-up error:", error);
    }
  } finally {
    onIsLoading(false);
  }
};

export const verifyAccount = async (
  verificationCode: number,
  identifier: string,
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void,
  updateUser: (user: Partial<jwtPayload>) => void
) => {
  onIsLoading(true);

  const ident = isValidEmail(identifier)
    ? { email: identifier }
    : { phoneNumber: identifier };

  try {
    const { data } = await axiosInstance.post("/auth/verify-account", {
      ...ident,
      verificationCode,
    });

    if (data) updateUser({ isVerified: true } as Partial<jwtPayload>);

    return data; // Return response data on success
  } catch (error) {
    onIsLoading(false); // Stop loading on error

    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data as { message: string };
      onError(errData.message || "Verification failed.");
      console.error("Verification error:", errData);
    } else {
      onError("An unexpected error occurred. Could not verify your account.");
      console.error("Unexpected verification error:", error);
    }
  } finally {
    onIsLoading(false);
  }
};
export const resendCode = async (
  identifier: string,
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void
) => {
  onIsLoading(true);

  const ident = isValidEmail(identifier)
    ? { email: identifier }
    : { phoneNumber: identifier };

  try {
    const { data } = await axiosInstance.post(
      "/auth/verify-account/resend",
      ident
    );

    return data; // Return response data on success
  } catch (error) {
    onIsLoading(false); // Stop loading on error

    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data as { message: string };
      onError(errData.message || "Verification failed.");
      console.error("Verification error:", errData);
    } else {
      onError("An unexpected error occurred. Could not verify your account.");
      console.error("Unexpected verification error:", error);
    }
  } finally {
    onIsLoading(false);
  }
};

// export const refreshAt = async () => {
//   try {
//     const { data } = await axiosInstance.post("auth/refresh");

//     if (!data) throw new Error("couldn't refresh");
//     // Store tokens securely in cookies
//     Cookie.set("access_token", data.access_token, {
//       secure: true,
//       sameSite: "Strict",
//     });
//     Cookie.set("refresh_token", data.refresh_token, {
//       secure: true,
//       sameSite: "Strict",
//     });
//     return data;
//   } catch (err) {
//     console.error("error while refreshing...", err);
//   }
// };

export const logout = async (removeUser: () => void) => {
  try {
    await axiosInstance.post("/auth/logout", {
      headers: {
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });

    // Remove the authentication token from cookies
    Cookie.remove("access_token");
    removeUser();
    // Optional: Redirect to login or home page
    window.location.href = "/";
  } catch (err) {
    console.error("Logout failed:", err);
    throw new Error("Failed to log out. Please try again.");
  }
};
