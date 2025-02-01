import Cookie from "js-cookie";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import { SignInResponse } from "@/types/auth";
import { isValidEmail } from "@/utils/validators";

export const signIn = async (identifier: string, password: string) => {
  try {
    console.log("starting auth");
    const identifierBody = isValidEmail(identifier)
      ? { email: identifier }
      : { phoneNumber: identifier };
    const reqBody = {
      ...identifierBody,
      password,
    };

    console.log(reqBody);

    const { data } = await axiosInstance.post<SignInResponse>(
      "/auth/local/signin",
      reqBody
    );

    console.log(data);
    // Store tokens in cookies
    Cookie.set("access_token", data.access_token, {
      secure: true,
      sameSite: "Strict",
    });
    Cookie.set("refresh_token", data.refresh_token, {
      secure: true,
      sameSite: "Strict",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Sign-in error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Sign-in failed");
    } else {
      console.error("Sign-in error:", error);
      throw new Error("Sign-in failed");
    }
  }
};
