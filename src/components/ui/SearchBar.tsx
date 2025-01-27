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
    <div className="w-80 flex items-center bg-white rounded-full shadow-lg px-4 py-4  md:w-1/2 my-5">
      <input
        type="text"
        placeholder="Find donations..."
        className="flex-grow bg-transparent text-gray-600 focus:outline-none placeholder-gray-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update input value
      />
      <FiSearch className="text-gray-400 text-xl" />
    </div>
  );
};

export default SearchBar;
