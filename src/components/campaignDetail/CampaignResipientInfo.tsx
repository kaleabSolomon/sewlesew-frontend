import { formatText } from "@/utils/helpers";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import { MdOutlineWork, MdLocationOn, MdEmail } from "react-icons/md";

export interface Recipient {
  fullName: string;
  sector: string;
  website: string | null;
  region: string;
  city: string;
  relativeLocation?: string;
  publicEmail?: string;
  publicPhoneNumber?: string;
}

const CampaignRecipientInfo = ({ recipient }: { recipient: Recipient }) => {
  if (!recipient) {
    return <div>No recipient info available</div>;
  }
  return (
    <div className="bg-white rounded-md shadow-lg p-6 border border-customTeal space-y-2">
      <h3 className="text-lg">
        This campaign is for{" "}
        <span className="text-customTeal">{recipient?.fullName} </span>
      </h3>

      {recipient?.sector && (
        <p className="flex gap-2 items-center">
          <MdOutlineWork className="text-customTeal" />

          {formatText(recipient.sector)}
        </p>
      )}

      {recipient?.website && (
        <a
          href={recipient.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-customTeal hover:underline"
        >
          <FaGlobe /> Visit Website
        </a>
      )}

      <div className="flex items-start gap-2">
        <MdLocationOn size={26} className=" text-customTeal" />{" "}
        {recipient?.region}, {recipient?.city}, {recipient?.relativeLocation}
      </div>

      {recipient?.publicEmail && (
        <a
          href={`mailto:${recipient.publicEmail}`}
          className="flex items-center gap-2 text-customTeal hover:underline"
        >
          <MdEmail /> {recipient.publicEmail}
        </a>
      )}

      {recipient?.publicPhoneNumber && (
        <a
          href={`tel:${recipient.publicPhoneNumber}`}
          className="flex items-center gap-2 text-customTeal hover:underline"
        >
          <FaPhoneAlt /> {recipient.publicPhoneNumber}
        </a>
      )}
    </div>
  );
};

export default CampaignRecipientInfo;
