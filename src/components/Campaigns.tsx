import { campaigns } from "@/data/data";
import Button from "./ui/Button";
import { CiBookmark } from "react-icons/ci";

const Campaigns = () => {
  return (
    <div className="flex flex-wrap items-start justify-around max-w-6xl gap-y-6">
      {campaigns.map((campaign) => {
        return (
          <div className="group w-[329px] h-[440px] bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-nonetransition-all">
            <div className="w-full h-[210px] mb-2 rounded-xl">
              <img
                src={campaign.imgUrl}
                alt="campaign image"
                className="w-full h-full rounded-"
              />
            </div>
            <div className="px-6">
              <div className="flex justify-between py-2">
                <h1 className="text-gray-500 font-light text-xs">
                  {campaign.date}
                </h1>
                <h1 className="text-customTeal font-light text-xs">
                  {campaign.stats.totalDonation} Donations
                </h1>
              </div>
              <h1 className="text-lg text-gray-800 font-bold group-hover:text-customTeal  transition-all">
                {campaign.title}
              </h1>
              <p className=" text-gray-700 text-sm font-light pt-2 pb-4">
                {campaign.description}
              </p>

              <div className="w-full flex gap-2">
                <Button variant="secondary" shape="block">
                  <CiBookmark />
                </Button>

                <Button variant="secondary" shape="block" className="w-full">
                  Donate now
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Campaigns;
