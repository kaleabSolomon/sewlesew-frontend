import { Donation } from "@/types/campaign";
import { FaShare } from "react-icons/fa6";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
import { useCallback, useEffect, useState } from "react";
import DonationModal from "../ui/DonationModal";
import {
  donate,
  donateGuest,
  getDonationsByCampaign,
} from "@/services/donation";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

const CampaignDonations = ({
  raisedAmount,
  goalAmount,
}: {
  raisedAmount: number;
  goalAmount: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const params = useParams();
  const campaignId = params.id;

  const fetchDonations = useCallback(async () => {
    try {
      if (!campaignId) return;
      const res = await getDonationsByCampaign(campaignId);

      setDonations(res.data);
    } catch (error) {
      console.error("Error fetching donation history:", error);
    }
  }, [campaignId]);

  // Fetch donations on mount
  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  // Refetch when the tab becomes active again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchDonations();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", fetchDonations);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", fetchDonations);
    };
  }, [fetchDonations]);

  const handleDonation = async (
    donorFirstName: string,
    donorLastName: string,
    email: string,
    amount: number,
    isAnonymous: boolean
  ) => {
    try {
      const campaignId = params.id;
      if (campaignId) {
        const res = isAuthenticated()
          ? await donate(
              { donorFirstName, donorLastName, email, amount, isAnonymous },
              campaignId
            )
          : await donateGuest(
              { donorFirstName, donorLastName, email, amount, isAnonymous },
              campaignId
            );

        if (res && res.status == "success") {
          if (!res.data.checkoutUrl) return;
          window.open(res.data.checkoutUrl, "_blank", "noopener,noreferrer");
        }
      } else {
        console.error("Campaign ID is undefined");
      }
    } catch (err) {
      console.error("Error donating:", err);
    }
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
      {donations.length === 0 && (
        <p className="text-gray-700">
          No donations yet.{" "}
          <span className="text-customTeal">Be the first one!</span>
        </p>
      )}
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
