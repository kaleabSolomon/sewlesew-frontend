import SearchBar from "./ui/SearchBar";
import Categories from "./ui/Categories";
import Campaigns from "./Campaigns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./ui/pagination";
import { GrLinkNext } from "react-icons/gr";

const Donations = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-4xl">
        Open <span className="text-customTeal ">donations</span>
      </h1>
      <div className="flex  items-center md:flex-col ">
        <SearchBar />
        <Categories />
      </div>
      <Campaigns />
      <div className=" flex justify-between w-full mt-8 mb-24 ">
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <p className="text-customTeal flex w-32 items-center gap-2">
          See More <GrLinkNext />
        </p>
      </div>
    </div>
  );
};

export default Donations;
