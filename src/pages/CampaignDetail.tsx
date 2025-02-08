import CampaignDonations from "@/components/campaignDetail/CampaignDonations";
import Detail from "@/components/campaignDetail/Detail";
import CampaignResipientInfo from "@/components/campaignDetail/CampaignResipientInfo";
import { getCampaign } from "@/services/campaign";
import { ICampaignDetail } from "@/types/campaign";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function CampaignDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [campaign, setCampaign] = useState<ICampaignDetail>();

  const param = useParams();

  const campaignId = param.id;

  const handleIsLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleError = (err: string) => {
    setError(err);
  };

  useEffect(() => {
    const fetchCampaign = async () => {
      if (campaignId) {
        const campaign = await getCampaign(
          campaignId,
          handleIsLoading,
          handleError
        );
        setCampaign(campaign.data);
      } else {
        handleError("Campaign ID is undefined");
      }
    };

    fetchCampaign();
  }, [campaignId]);

  return (
    <div>
      {isLoading && (
        <div className="max-w-6xl mt-32 mx-auto p-6 grid grid-cols-3 gap-6">
          {/* Detail Card Skeleton */}
          <div className="col-span-2 space-y-4">
            <div className="bg-gray-200 h-10 w-3/4 rounded animate-pulse" />
            <div className="bg-gray-300 h-64 w-full rounded animate-pulse" />
            <div className="bg-gray-200 h-6 w-1/2 rounded animate-pulse" />
            <div className="bg-gray-200 h-6 w-3/4 rounded animate-pulse" />
            <div className="bg-gray-300 h-20 w-full rounded animate-pulse" />
            <div className="bg-gray-400 h-10 w-1/4 rounded animate-pulse" />
          </div>

          {/* Right Column Skeleton (Donations & Testimonials) */}
          <div className="space-y-6">
            {/* Donations Section Skeleton */}
            <div className="bg-gray-200 h-8 w-1/2 rounded animate-pulse" />
            <div className="bg-gray-300 h-16 w-full rounded animate-pulse" />
            <div className="bg-gray-300 h-16 w-full rounded animate-pulse" />

            {/* Testimonials Section Skeleton */}
            <div className="bg-gray-200 h-8 w-1/2 rounded animate-pulse" />
            <div className="bg-gray-300 h-16 w-full rounded animate-pulse" />
            <div className="bg-gray-300 h-16 w-full rounded animate-pulse" />
          </div>
        </div>
      )}

      {error && (
        <div className="w-full mt-44 mx-auto flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center bg-red-50 p-6 rounded-lg border border-red-300 shadow-md ">
            <AlertTriangle className="w-12 h-12 text-red-600 mb-4" />
            <h2 className="text-2xl font-semibold text-red-700">
              Oops! Something went wrong. 😞
            </h2>
            <p className="text-gray-700 mt-2">
              We couldn't load the campaign details. This might be a temporary
              issue—hang tight!
            </p>
          </div>
        </div>
      )}

      {!isLoading && !error && campaign && (
        <div className="max-w-6xl mt-32 mx-auto p-6 grid grid-cols-3 gap-6">
          {/* Left Side - Detail (Takes 2 columns) */}
          <div className="col-span-2">
            {campaign && <Detail campaign={campaign} />}
          </div>

          {/* Right Side - Donations on Top, Testimonials below */}
          <div className="flex flex-col gap-6">
            <CampaignDonations
              raisedAmount={campaign.raisedAmount}
              goalAmount={campaign.goalAmount}
              donations={campaign?.Donation}
            />
            {(campaign.business || campaign.charity) && (
              <CampaignResipientInfo resipient={campaign.business} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
