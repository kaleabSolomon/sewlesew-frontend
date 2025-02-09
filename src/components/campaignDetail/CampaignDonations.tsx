import { Donation } from "@/types/campaign";
import { FaShare } from "react-icons/fa6";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
import { useState } from "react";
import DonationModal from "../ui/DonationModal";

const CampaignDonations = ({
  raisedAmount,
  goalAmount,
  donations,
}: {
  raisedAmount: number;
  goalAmount: number;
  donations: Donation[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDonation = (
    donorFirstName: string,
    donorLastName: string,
    email: string,
    amount: number,
    isAnonymous: boolean
  ) => {
    console.log("Donation submitted:", {
      donorFirstName,
      donorLastName,
      email,
      amount,
      isAnonymous,
    });
    // Call your API or service to handle the donation submission
  };

  return (
    <div className="bg-white rounded-lg  p-6 border border-customTeal shadow-md">
      <p className="font-semibold text-lg mb-4">
        ✨ Be A part of the change! ✨
      </p>
      <ProgressBar progress={(raisedAmount / goalAmount) * 100} />
      <div className="w-full flex gap-2 mb-4">
        <Button
          variant="secondary"
          shape="block"
          className="w-full"
          onClick={openModal}
        >
          Donate now
        </Button>
        <Button variant="secondary" shape="block">
          <FaShare />
        </Button>
      </div>

      <DonationModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleDonation={handleDonation}
      />
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
