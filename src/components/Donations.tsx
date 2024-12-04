import SearchBar from "./ui/SearchBar";

const Donations = () => {
  return (
    <div className="mx-20 my-16 border border-3 border-red-500  flex flex-col items-center">
      <h1 className="font-semibold text-4xl">
        Open <span className="text-customTeal ">donations</span>
      </h1>
      <SearchBar />
    </div>
  );
};

export default Donations;
