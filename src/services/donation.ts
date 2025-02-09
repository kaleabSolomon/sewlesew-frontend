import { IDonation } from "@/types/donation";
import axios from "axios";
import axiosInstance from "./axiosInstance";

export const donate = async (donation: IDonation, campaignId: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/donate/${campaignId}`,
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
