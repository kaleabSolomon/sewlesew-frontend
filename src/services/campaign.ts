import axios from "axios";
import axiosInstance from "./axiosInstance";
import { CampaignFormData } from "@/types/campaign";
import Cookie from "js-cookie";
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
    } else {
      onError(
        "An unexpected error occurred. Could not fetch the campaign detail"
      );
    }
  } finally {
    onIsLoading(false);
  }
};

export const createCampaign = async (
  data: CampaignFormData,
  type: string,
  onIsLoading: (isLoading: boolean) => void,
  onError: (err: string) => void
) => {
  onIsLoading(true);
  try {
    const url = `${
      type === "business"
        ? "/business"
        : type === "charity"
        ? "/charity/organization"
        : "/charity/personal"
    }`;

    const formData = new FormData();

    // Append non-file fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (key === "otherImages" || key === "supportingDocuments") {
        // Append each file in the array
        if (Array.isArray(value)) {
          value.forEach((file) => {
            formData.append(key, file);
          });
        }
      } else if (value !== null && value !== "") {
        // Append other fields (skip null or empty values)
        formData.append(key, value);
      }
    });

    const res = await axiosInstance.post(`/campaign${url}`, formData, {
      headers: {
        Authorization: `Bearer ${Cookie.get("access_token")}`,
        "Content-Type": "multipart/form-data", // Ensure correct content type
      },
    });

    return res.data;
  } catch (err) {
    onIsLoading(false);
    if (axios.isAxiosError(err)) {
      onError(err.response?.data.message || "Could not Create Campaign."); // Log for debugging
      throw new Error(err.response?.data.message || "An error occurred");
    }
    throw new Error("An unexpected error occurred");
  } finally {
    onIsLoading(false);
  }
};
