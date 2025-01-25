import Button from "./ui/Button";
import { FaShare } from "react-icons/fa6";
import ProgressBar from "./ui/ProgressBar";
import { CampaignPreview } from "@/types/campaign";
import { FC } from "react";
import { formatDaysLeft } from "@/utils/helpers";
import CampaignSkeleton from "./ui/CampaignSkeleton";

interface CampaignProps {
  isLoading: boolean;
  error: string;
  campaigns: CampaignPreview[];
}

const Campaigns: FC<CampaignProps> = ({ isLoading, error, campaigns }) => {
  return isLoading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-6xl gap-6">
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <CampaignSkeleton index={idx} />
        ))}
    </div>
  ) : error ? (
    <div className="text-center py-8">
      <h2 className="text-red-500 text-xl font-semibold">Error</h2>
      <p className="text-gray-600">{error}</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-6xl gap-6">
      {campaigns.map((campaign) => {
        return (
          <div className="group w-[329px] h-[440px] bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-nonetransition-all">
            <div className="w-full h-[210px] mb-2 rounded-xl">
              <img
                src={campaign.campaignMedia[0].url}
                alt="campaign image"
                className="w-full h-full brightness-75 group-hover:brightness-100 transition-all"
              />
            </div>
            <div className="px-6">
              <div className="flex justify-between py-2">
                <h1 className="text-gray-700 font-light text-xs">
                  {formatDaysLeft(campaign.deadline)}
                </h1>
                <h1 className="text-customTeal font-light text-xs">
                  {campaign._count.Donation} Donations
                </h1>
              </div>
              <h1 className="text-lg text-gray-800 font-bold group-hover:text-customTeal  transition-all">
                {campaign.title}
              </h1>
              <p className=" line-clamp-2 text-gray-700 text-sm font-light pt-2 pb-2">
                {campaign.description}
              </p>
              <ProgressBar
                progress={(campaign.raisedAmount / campaign.goalAmount) * 100}
              />
              <div className="w-full flex gap-2">
                <Button variant="secondary" shape="block" className="w-full">
                  Donate now
                </Button>
                <Button variant="secondary" shape="block">
                  <FaShare />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Campaigns;
