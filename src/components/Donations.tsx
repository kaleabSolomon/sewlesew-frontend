import SearchBar from "./ui/SearchBar";
import Categories from "./ui/Categories";
import Campaigns from "./Campaigns";

import { GrLinkNext } from "react-icons/gr";
import Pagination from "./ui/pagination";
import { campaignMetadata, CampaignPreview } from "@/types/campaign";
import { FC } from "react";
interface DonationProps {
  isLoading: boolean;
  error: string;
  campaigns: CampaignPreview[];
  meta: campaignMetadata;
}
const Donations: FC<DonationProps> = ({
  isLoading,
  error,
  campaigns,
  meta,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-4xl">
        Open <span className="text-customTeal ">donations</span>
      </h1>
      <div className="flex items-center md:flex-col mb-6 ">
        <SearchBar />
        <Categories />
      </div>
      <Campaigns isLoading={isLoading} error={error} campaigns={campaigns} />
      <div className=" flex justify-between w-full mt-8 mb-24 ">
        <div>
          <Pagination
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
            onPageChange={() => {}}
          />
        </div>

        <p className="text-customTeal flex w-32 items-center gap-2">
          See More <GrLinkNext />
        </p>
      </div>
    </div>
  );
};

export default Donations;
