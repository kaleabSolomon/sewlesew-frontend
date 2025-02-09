import React, { useState, useEffect } from "react";

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
  const [donorFirstName, setDonorFirstName] = useState<string>("");
  const [donorLastName, setDonorLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const handleSubmit = () => {
    if (donorFirstName && donorLastName && email && amount > 0) {
      handleDonation(donorFirstName, donorLastName, email, amount, isAnonymous);
      closeModal(); // Close the modal after donation
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  useEffect(() => {
    // Reset form fields when modal is opened
    if (isOpen) {
      setDonorFirstName("");
      setDonorLastName("");
      setEmail("");
      setAmount(0);
      setIsAnonymous(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="modal-content bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">Make a Donation</h2>

        <div className="mb-4">
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

        <div className="mb-4">
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
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border rounded"
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
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
