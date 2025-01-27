import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getCampaigns = async (
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void,
  page?: number,
  limit?: number,
  category?: string,
  fullName?: string
) => {
  onIsLoading(true);
  onError("");

  try {
    const params = new URLSearchParams();
    if (page) {
      params.append("page", page.toString());
    }
    if (limit) params.append("limit", limit.toString());

    if (category) {
      params.append("category", category);
    }

    if (fullName) {
      params.append("for", fullName);
    }

    const url = `/campaign?${params.toString()}`;
    console.log("Fetching URL:", url);
    const res = await axiosInstance.get(url, {
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
