import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  fetchCampaigns,
}: {
  fetchCampaigns: (
    page?: number,
    limit?: number,
    category?: string,
    fullName?: string
  ) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // Current value of the input
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Value after debounce delay

  // Debounce logic to wait before triggering the search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.length >= 2 || searchTerm === "") {
        setDebouncedSearchTerm(searchTerm);
      }
    }, 300); // Delay of 300ms

    return () => {
      clearTimeout(handler); // Clear timeout if the component re-renders
    };
  }, [searchTerm]);

  // Trigger fetchCampaigns when debouncedSearchTerm changes
  useEffect(() => {
    if (debouncedSearchTerm.length >= 2 || debouncedSearchTerm === "") {
      fetchCampaigns(1, 6, undefined, debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full max-w-2xl flex items-center  border border-customTeal bg-teal-200/5 rounded-lg shadow-sm px-4 py-3 my-5">
      <input
        type="text"
        placeholder="Find campaigns..."
        className="flex-grow bg-transparent text-teal-800 focus:outline-none placeholder-teal-700"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FiSearch className="text-teal-600 text-xl" />
    </div>
  );
};

export default SearchBar;
