import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="w-80 flex items-center bg-white rounded-full shadow-lg px-4 py-4  md:w-1/2 my-5">
      <input
        type="text"
        placeholder="Find donations..."
        className="flex-grow bg-transparent text-gray-600 focus:outline-none placeholder-gray-400"
      />
      <FiSearch className="text-gray-400 text-xl" />
    </div>
  );
};

export default SearchBar;
