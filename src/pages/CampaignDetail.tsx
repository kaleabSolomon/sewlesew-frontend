import CampaignDonations from "@/components/campaignDetail/CampaignDonations";
import Detail from "@/components/campaignDetail/Detail";
import CampaignResipientInfo from "@/components/campaignDetail/CampaignResipientInfo";
import { getCampaign } from "@/services/campaign";
import { ICampaignDetail } from "@/types/campaign";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CampaignDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [campaign, setCampaign] = useState<ICampaignDetail>();

  const param = useParams();

  const campaignId = param.id;
  console.log(campaignId);

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
        <>
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
        </>
      )}

      {error && (
        <div className="col-span-3 text-center text-red-600">
          <h2 className="text-xl font-semibold">
            We couldn't load the campaign details.
          </h2>
          <p>Please try again later.</p>
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
