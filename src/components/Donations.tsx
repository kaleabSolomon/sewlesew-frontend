import SearchBar from "./ui/SearchBar";
import Categories from "./ui/Categories";
import Campaigns from "./Campaigns";

import { GrLinkNext } from "react-icons/gr";
import Pagination from "./ui/pagination";
import { useCampaignContext } from "@/context/campaignContext";
import { useEffect, useState } from "react";

const Donations = () => {
  const { campaigns, isLoading, error, meta, fetchCampaigns } =
    useCampaignContext();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCampaigns(page);
  };
  useEffect(() => {
    fetchCampaigns(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-4xl">
        Open <span className="text-customTeal ">donations</span>
      </h1>
      <div className="flex items-center md:flex-col mb-6 ">
        <SearchBar fetchCampaigns={fetchCampaigns} />
        <Categories fetchCampaigns={fetchCampaigns} />
      </div>
      <Campaigns isLoading={isLoading} error={error} campaigns={campaigns} />
      <div className=" flex justify-between w-full mt-8 mb-24 ">
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={meta?.totalPages || 1} // Get total pages from metadata
            onPageChange={handlePageChange}
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
