import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getCampaigns = async (
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void
) => {
  onIsLoading(true);
  onError("");

  try {
    const res = await axiosInstance.get("/campaign", {
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return res.data;
  } catch (err) {
    onIsLoading(false);

    if (axios.isAxiosError(err)) {
      onError(err.response?.data.message);
      console.error(err.response?.data);
    } else {
      onError("An unexpected error occurred.");
    }
    throw err;
  } finally {
    onIsLoading(false);
  }
};
