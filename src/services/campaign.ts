import axios from "axios";
import axiosInstance from "./axiosInstance";
import { CampaignFormData } from "@/types/campaign";
import Cookies from "js-cookie";

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
    const res = await axiosInstance.get(url, {
      headers: {
        "Content-Type": "Application/json",
      },
    });

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

export const createCampaign = async (data: CampaignFormData, type: string) => {
  try {
    const url = `${
      type === "business"
        ? "/business"
        : type === "charity"
        ? "/charity/organization"
        : "/charity/personal"
    }`;

    // Create a FormData object
    const formData = new FormData();

    // Append non-file fields
    Object.entries(data).forEach(([key, value]) => {
      if (
        value instanceof File ||
        (Array.isArray(value) && value[0] instanceof File)
      ) {
        // Append files (for multiple files, append each separately)
        if (Array.isArray(value)) {
          value.forEach((file) => formData.append(key, file));
        } else {
          formData.append(key, value);
        }
      } else {
        formData.append(key, value as string); // Convert non-file values to string
      }
    });

    const res = await axiosInstance.post(`/campaign${url}`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
        "Content-Type": "multipart/form-data", // Ensure correct content type
      },
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data); // Log for debugging
      throw new Error(err.response?.data.message || "An error occurred");
    }
    throw new Error("An unexpected error occurred");
  }
};
