import { ICampaignDetail } from "@/types/campaign";
import { Carousel, CarouselItem } from "../ui/Carousel";
import { FaBusinessTime, FaDonate, FaHandshake, FaUser } from "react-icons/fa";
import { TbCashBanknoteFilled } from "react-icons/tb";
import { daysAgo, formatDaysLeft } from "@/utils/helpers";
import { ImPriceTag } from "react-icons/im";

export default function Detail({ campaign }: { campaign: ICampaignDetail }) {
  const {
    title,
    description,
    goalAmount,
    raisedAmount,
    deadline,
    campaignMedia,
    charity,
    category,
    user,
    business,
    createdAt,
  } = campaign;

  const coverImage = campaignMedia.find(
    (img) => img.imageType === "COVER_IMAGE"
  );
  const supportingImages = campaignMedia.filter(
    (img) => img.imageType === "SUPPORTING_IMAGE"
  );

  const campaignType = business
    ? "Business"
    : charity?.isOrganization
    ? "Charity"
    : "Personal";

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-4 border border-customTeal">
      <h2 className="text-4xl font-bold text-gray-800">{title}</h2>

      <div className="w-full relative">
        <div className="absolute top-2 right-0 flex items-center justify-end bg-customTealDark text-white text-sm font-semibold z-10  px-2 py-2 rounded-l-full">
          {campaignType === "Business" ? (
            <FaBusinessTime size={16} className="mr-2" />
          ) : campaignType === "Charity" ? (
            <FaHandshake size={16} className="mr-2" />
          ) : (
            <FaUser size={16} className="mr-2" />
          )}
          <p>{campaignType}</p>
        </div>
        <Carousel>
          {coverImage ? (
            <CarouselItem key="cover">
              <img
                src={coverImage.url}
                alt="Cover"
                className="w-full h-96 object-cover rounded-lg"
              />
            </CarouselItem>
          ) : null}

          {supportingImages?.length > 0 &&
            supportingImages.map((img) => (
              <CarouselItem key={img.id}>
                <img
                  src={img.url}
                  alt="Supporting"
                  className="w-full h-96 object-cover rounded-lg border"
                />
              </CarouselItem>
            ))}
        </Carousel>
      </div>
      <div className="grid grid-cols-2  text-gray-700">
        <div
          className="flex justify-self-start items-center bg-customTealDark text-white w-fit px-4 py-2 rounded-full 
        "
        >
          <FaDonate size={16} className="mr-2" />
          <p>{raisedAmount.toLocaleString()} Br raised</p>
        </div>
        <div
          className="flex justify-self-end items-center bg-customTealDark text-white w-fit px-4 py-2 rounded-full 
        "
        >
          <TbCashBanknoteFilled size={18} className="mr-2" />{" "}
          <p>{goalAmount.toLocaleString()} Br needed</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-customTeal rounded-full flex items-center justify-center">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full object-fill border-2 border-customTealLight
               rounded-full"
            />
          ) : (
            <FaUser className="w-2/5 h-2/5 overflow-hidden text-white" />
          )}
        </div>
        <p className="text-gray-800">
          <strong>
            {user.firstName} {user.lastName}
          </strong>{" "}
          is organizing this campaign.
        </p>
      </div>

      <div className="flex items-center gap-x-2">
        <p>Created {daysAgo(createdAt)}</p>
        <div className="h-2 w-2 rounded-full bg-customTealLight/30"></div>
        {formatDaysLeft(deadline)}
        <div className="h-2 w-2 rounded-full bg-customTealLight/30"></div>
        <div
          className="flex items-center bg-customTealDark text-white w-fit px-4 py-2 rounded-full 
        "
        >
          <ImPriceTag size={16} className="mr-2" />
          <p>{category.toLowerCase().split("_").join(" ")}</p>
        </div>
        <div className=""></div>
      </div>

      {/* Description */}
      <p className="text-gray-900 text-md">{description}</p>
    </div>
  );
}
