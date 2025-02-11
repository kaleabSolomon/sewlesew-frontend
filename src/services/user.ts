import Cookie from "js-cookie";
import axiosInstance from "./axiosInstance";
import axios from "axios";

export const getUserBrief = async () => {
  try {
    const at = Cookie.get("access_token");
    const res = await axiosInstance.get("/user/me", {
      headers: {
        Authorization: `Bearer ${at}`,
        "Content-Type": "Application/json",
      },
    });

    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data); // Log for debugging
      throw new Error(err.response?.data.message || "An error occurred");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateUser = async (
  formData: FormData,
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void
) => {
  onIsLoading(true);
  try {
    const { data } = await axiosInstance.patch("/user", formData, {
      headers: {
        Authorization: `Bearer ${Cookie.get("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    onIsLoading(false);
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data);
      onError(err.response?.data.message || "Could not Create Campaign."); // Log for debugging
      throw new Error(err.response?.data.message || "An error occurred");
    }
    throw new Error("An unexpected error occurred");
  } finally {
    onIsLoading(false);
  }
};
