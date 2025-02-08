import Cookie from "js-cookie";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import {
  AuthError,
  signinData,
  SignInResponseSuccess,
  SignupData,
} from "@/types/auth";
import { isValidEmail } from "@/utils/validators";

export const signIn = async (
  signinData: signinData,
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void,
  updateAuthData: () => void
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

    updateAuthData();

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
  updateAuthData: () => void
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

    updateAuthData();
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
  updateAuthData: () => void
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

    updateAuthData();

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
