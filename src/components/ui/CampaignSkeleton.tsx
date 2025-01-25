import { FC } from "react";

const CampaignSkeleton: FC<{ index: number }> = ({ index }) => {
  return (
    <div
      key={index}
      className="group w-[329px] h-[440px] bg-white rounded-lg overflow-hidden border border-gray-200 animate-pulse"
    >
      <div className="w-full h-[210px] mb-2 bg-gray-300 rounded-xl" />
      <div className="px-6">
        <div className="flex justify-between py-2">
          <div className="w-20 h-4 bg-gray-300 rounded" />
          <div className="w-20 h-4 bg-gray-300 rounded" />
        </div>
        <div className="w-3/4 h-5 bg-gray-300 rounded mb-2" />
        <div className="w-full h-4 bg-gray-300 rounded" />
        <div className="w-full flex gap-2 mt-2">
          <div className="w-full h-10 bg-gray-300 rounded" />
          <div className="h-10 w-12 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CampaignSkeleton;
