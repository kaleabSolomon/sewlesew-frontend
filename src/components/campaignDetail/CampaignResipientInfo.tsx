import { CampaignResipient } from "@/types/campaign";
import { formatText } from "@/utils/helpers";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import { MdOutlineWork, MdLocationOn, MdEmail } from "react-icons/md";

const CampaignResipientInfo = ({
  resipient,
}: {
  resipient: CampaignResipient | null;
}) => {
  return (
    <div className="bg-white rounded-md shadow-lg p-6 border border-customTeal space-y-2">
      <h3 className="text-lg">
        This campaign is for{" "}
        <span className="text-customTeal">{resipient?.fullName} </span>
      </h3>

      {resipient?.sector && (
        <p className="flex gap-2 items-center">
          <MdOutlineWork className="text-customTeal" />

          {formatText(resipient.sector)}
        </p>
      )}

      {resipient?.website && (
        <a
          href={resipient.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-customTeal hover:underline"
        >
          <FaGlobe /> Visit Website
        </a>
      )}

      <div className="flex items-start gap-2">
        <MdLocationOn size={26} className=" text-customTeal" />{" "}
        {resipient?.region}, {resipient?.city}, {resipient?.relativeLocation}
      </div>

      {resipient?.publicEmail && (
        <a
          href={`mailto:${resipient.publicEmail}`}
          className="flex items-center gap-2 text-customTeal hover:underline"
        >
          <MdEmail /> {resipient.publicEmail}
        </a>
      )}

      {resipient?.publicPhoneNumber && (
        <a
          href={`tel:${resipient.publicPhoneNumber}`}
          className="flex items-center gap-2 text-customTeal hover:underline"
        >
          <FaPhoneAlt /> {resipient.publicPhoneNumber}
        </a>
      )}
    </div>
  );
};

export default CampaignResipientInfo;
