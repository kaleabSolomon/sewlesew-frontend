import { IDonation } from "@/types/donation";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import Cookie from "js-cookie";

export const donateGuest = async (donation: IDonation, campaignId: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/donation/guest/${campaignId}`,
      donation
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data;
      console.error("fetching error: ", errData);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
export const donate = async (donation: IDonation, campaignId: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/donation/${campaignId}`,
      donation,
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("access_token")}`,
          "Content-Type": "Application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data;
      console.error("fetching error: ", errData);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const getDonationsByCampaign = async (campaignId: string) => {
  try {
    const { data } = await axiosInstance.get(`/donation/${campaignId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data;
      console.error("fetching error: ", errData);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
