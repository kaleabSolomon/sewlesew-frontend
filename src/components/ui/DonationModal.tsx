import { useUser } from "@/context/userContext";
import React, { useState, useEffect } from "react";
import chapa from "../../assets/chapa-logo.png";
import Button from "./Button";

interface DonationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleDonation: (
    donorFirstName: string,
    donorLastName: string,
    email: string,
    amount: number,
    isAnonymous: boolean
  ) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  closeModal,
  handleDonation,
}) => {
  const { user } = useUser();
  const [donorFirstName, setDonorFirstName] = useState<string>(
    user?.firstName || ""
  );
  const [donorLastName, setDonorLastName] = useState<string>(
    user?.lastName || ""
  );
  const [email, setEmail] = useState<string>(user?.email || "");
  const [amount, setAmount] = useState<number>(0);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setDonorFirstName((prev) => prev || user.firstName);
      setDonorLastName((prev) => prev || user.lastName);
      setEmail((prev) => prev || user.email || "");
    }
  }, [user]);

  const handleSubmit = () => {
    if (donorFirstName && donorLastName && email && amount > 0) {
      handleDonation(donorFirstName, donorLastName, email, amount, isAnonymous);
      setAmount(0); // Reset amount after donation
      setIsAnonymous(false);
      closeModal(); // Close the modal after donation
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-start pt-32 z-50"
      onClick={handleOutsideClick}
    >
      <div className="modal-content bg-white border-2 border-customTeal p-6 rounded-md w-[420px]">
        <div className="flex  mb-6 items-center justify-between">
          <h2 className="text-xl font-semibold  text-customTeal">
            Make a Donation
          </h2>
          <div className="flex text-xs">
            Powered by <img className="w-20 ml-1" src={chapa} alt="chapa" />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-around gap-2">
          <div>
            <label htmlFor="firstName" className="block text-sm mb-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={donorFirstName}
              onChange={(e) => setDonorFirstName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="">
            <label htmlFor="lastName" className="block text-sm mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={donorLastName}
              onChange={(e) => setDonorLastName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm mb-1">
            Donation Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) setAmount(value); // Prevent negative numbers
            }}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            className="mr-2"
          />
          <label htmlFor="anonymous" className="text-sm">
            Donate Anonymously
          </label>
        </div>

        <div className="flex justify-between">
          <Button onClick={closeModal} variant="destructive" shape="block">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="primary" shape="block">
            Donate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
