import { useUser } from "@/context/userContext";

const DonationHistoryTab = () => {
  const { user } = useUser();

  const donations = user?.Donation || [];

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Donation History</h1>

      {donations.length === 0 ? (
        <p className="text-gray-500">No donations made yet.</p>
      ) : (
        <ul className="space-y-4">
          {donations.map((donation) => (
            <li
              key={donation.id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {donation.campaign.title}
                </h2>
                <p className="text-gray-600">
                  Donated: ${donation.amount.toLocaleString()} •{" "}
                  {new Date(donation.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-lg ${
                  donation.paymentStatus === "SUCCESS"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {donation.paymentStatus.toLowerCase()}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 text-lgs">
        Totally, You have donated{" "}
        {donations.reduce((acc, curr) => acc + curr.amount, 0)} Birr in{" "}
        {donations.length} donations.
      </div>
    </div>
  );
};

export default DonationHistoryTab;
