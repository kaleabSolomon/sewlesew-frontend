import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // Value after debounce delay

  // Debounce logic to wait before triggering the search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.length >= 2 || searchTerm === "") {
        setDebouncedSearchTerm(searchTerm);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Trigger fetchCampaigns when debouncedSearchTerm changes

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
