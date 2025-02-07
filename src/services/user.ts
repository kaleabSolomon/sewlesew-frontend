import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";
import axios from "axios";

export const getUserBrief = async () => {
  try {
    const res = await axiosInstance.get("/user/me", {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
        "Content-Type": "Application/json",
      },
    });
    return res.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data); // Log for debugging
      throw new Error(err.response?.data.message || "An error occurred");
    }
    throw new Error("An unexpected error occurred");
  }
};
