import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getCampaigns = async (
  page?: number,
  limit?: number,
  category?: string,
  fullName?: string
) => {
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

    console.log(res.data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data); // Log for debugging
      throw new Error(err.response?.data.message || "An error occurred");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getCampaign = async (
  id: string,
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void
) => {
  onIsLoading(true); // Indicate that the request has started

  try {
    const { data } = await axiosInstance.get(`/campaign/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    onIsLoading(false); // Stop loading on error

    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data;
      onError(errData.message || "failed to get detaild of campaign");
      console.error("fetching error: ", errData);
    } else {
      onError(
        "An unexpected error occurred. Could not fetch the campaign detail"
      );
      console.error("Unexpected error:", error);
    }
  } finally {
    onIsLoading(false);
  }
};
