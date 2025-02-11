import { useUser } from "@/context/userContext";

const MyCampaignsTab = () => {
  const { user } = useUser();

  const campaigns = user?.campaigns || [];
  // Mock campaign data

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Campaigns</h1>

      {campaigns.length === 0 ? (
        <p className="text-gray-500">You haven't created any campaigns yet.</p>
      ) : (
        <div className="max-h-[500px] overflow-y-auto  rounded-lg p-4">
          <ul className="space-y-4">
            {campaigns.map((campaign) => (
              <li
                key={campaign.id}
                className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{campaign.title}</h2>
                  <p className="text-gray-600">
                    Goal: {campaign.goalAmount.toLocaleString()} Birr • Raised:
                    {campaign.raisedAmount.toLocaleString()} Birr
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${
                    campaign.status === "PENDING"
                      ? "bg-yellow-200 text-yellow-800"
                      : campaign.status === "ACTIVE"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {campaign.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyCampaignsTab;
