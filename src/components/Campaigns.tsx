import Button from "./ui/Button";
import { FaShare } from "react-icons/fa6";
import ProgressBar from "./ui/ProgressBar";
import { CampaignPreview } from "@/types/campaign";
import { FC, useState } from "react";
import { formatDaysLeft } from "@/utils/helpers";
import CampaignSkeleton from "./ui/CampaignSkeleton";
import { useNavigate } from "react-router-dom";
import ShareModal from "./ui/ShareModal";

interface CampaignProps {
  isLoading: boolean;
  error: string;
  campaigns: CampaignPreview[];
}

const Campaigns: FC<CampaignProps> = ({ isLoading, error, campaigns }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
  ) : campaigns.length == 0 ? (
    <div className="w-full h-100 flex items-center justify-center">
      nothing found
    </div>
  ) : (
    <div className="grid   grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-6xl gap-6">
      {campaigns.map((campaign) => {
        return (
          <div className="group w-[329px] h-[460px] bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-none transition-all">
            <div className="relative w-full h-[210px] mb-2 rounded-xl">
              <img
                src={campaign.campaignMedia[0].url}
                alt="campaign image"
                className="w-full h-full brightness-75 group-hover:brightness-100 transition-all"
              />
              {/* Tag Badge - Aligned to the Top Right */}
              <span className="absolute top-2 right-0 bg-customTealLight text-white text-xs font-semibold px-3 py-1 rounded-l-full">
                {campaign.businessId
                  ? "Business"
                  : campaign.charityId
                  ? campaign.charity?.isOrganization
                    ? "Charity"
                    : "Personal"
                  : "charity"}
              </span>
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
              <h1 className="text-lg text-gray-800 font-bold group-hover:text-customTeal transition-all">
                {campaign.title}
              </h1>
              <p className="line-clamp-2 text-gray-700 text-sm font-light pt-2 pb-2">
                {campaign.description}
              </p>
              <ProgressBar
                progress={(campaign.raisedAmount / campaign.goalAmount) * 100}
              />
              <div className="w-full flex gap-2">
                <Button
                  variant="secondary"
                  shape="block"
                  className="w-full"
                  onClick={() => navigate(`/campaign/${campaign.id}`)}
                >
                  Donate now
                </Button>
                <Button
                  variant="secondary"
                  shape="block"
                  onClick={() => setShowModal(true)}
                >
                  <FaShare />
                </Button>

                {showModal && (
                  <ShareModal
                    content={`http://localhost:5173/campaign/${campaign.id}`}
                    onClose={() => setShowModal(false)}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Campaigns;
