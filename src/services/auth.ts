import Cookie from "js-cookie";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import { AuthError, signinData, SignInResponseSuccess } from "@/types/auth";
import { isValidEmail } from "@/utils/validators";

export const signIn = async (
  signinData: signinData,
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void
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
