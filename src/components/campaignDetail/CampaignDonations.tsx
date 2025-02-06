import { Donation } from "@/types/campaign";
import { FaShare } from "react-icons/fa6";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";

const CampaignDonations = ({
  raisedAmount,
  goalAmount,
  donations,
}: {
  raisedAmount: number;
  goalAmount: number;
  donations: Donation[];
}) => {
  return (
    <div className="bg-white rounded-lg  p-6 border border-customTeal shadow-md">
      <p className="font-semibold text-lg mb-4">
        ✨ Be A part of the change! ✨
      </p>
      <ProgressBar progress={(raisedAmount / goalAmount) * 100} />
      <div className="w-full flex gap-2 mb-4">
        <Button variant="secondary" shape="block" className="w-full">
          Donate now
        </Button>
        <Button variant="secondary" shape="block">
          <FaShare />
        </Button>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">Recent Donations</h3>
      <ul className="mt-2 space-y-2">
        {donations.map((donation, index) => (
          <li
            key={index}
            className="flex justify-between text-gray-700 py-2 border-b-2"
          >
            <span className="font-semibold">
              {donation.isAnonymous
                ? "Anonymous"
                : `${donation.donorFirstName} ${donation.donorLastName}`}{" "}
            </span>
            <span>
              {" "}
              <strong>{donation.amount}</strong> Br
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignDonations;
