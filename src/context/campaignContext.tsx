import { getCampaigns } from "@/services/campaign";
import { campaignMetadata, CampaignPreview } from "@/types/campaign";
import { createContext, FC, useContext, useState } from "react";

interface campaignContextType {
  isLoading: boolean;
  error: string;
  campaigns: CampaignPreview[];
  meta: campaignMetadata | null;
  fetchCampaigns: (
    page?: number,
    limit?: number,
    category?: string,
    fullName?: string
  ) => Promise<void>;
}

const CampaignContext = createContext<campaignContextType | undefined>(
  undefined
);

export const CampaingContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [meta, setMetadata] = useState<campaignMetadata | null>(null);

  const fetchCampaigns = async (
    page?: number,
    limit?: number,
    category?: string,
    fullName?: string
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getCampaigns(page, limit, category, fullName);

      setCampaigns(data.data); // Update campaigns state
      setMetadata(data.meta || null); // Update metadata
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CampaignContext.Provider
      value={{ campaigns, meta, error, isLoading, fetchCampaigns }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error(
      "useCampaignContext must be used within a CampaignContextProvider"
    );
  }
  return context;
};
