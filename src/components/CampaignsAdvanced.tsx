import SearchBar from "./ui/SearchBar";
import Categories from "./ui/Categories";
import Campaigns from "./Campaigns";

import Pagination from "./ui/pagination";
import { useCampaignContext } from "@/context/campaignContext";
import { useEffect, useState } from "react";

const CampaignsAdvanced = () => {
  const { campaigns, isLoading, error, meta, fetchCampaigns } =
    useCampaignContext();

  const [searchTerm, setSearchTerm] = useState(""); // Shared search state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCampaigns(page);
  };
  useEffect(() => {
    fetchCampaigns(currentPage, 9, selectedCategory, searchTerm);
  }, [currentPage, searchTerm, selectedCategory]);

  return (
    <div className="flex flex-col items-center mt-32 mb-5">
      <h1 className="font-semibold text-4xl">
        Open <span className="text-customTeal ">Campaigns</span>
      </h1>
      <div className="flex items-center md:flex-col mb-6 ">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <Campaigns isLoading={isLoading} error={error} campaigns={campaigns} />
      <div className="place-self-end mr-32">
        <Pagination
          currentPage={currentPage}
          totalPages={meta?.totalPages || 1} // Get total pages from metadata
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CampaignsAdvanced;
