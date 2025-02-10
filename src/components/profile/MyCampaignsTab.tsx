const MyCampaignsTab = () => {
  // Mock campaign data
  const campaigns = [
    {
      id: "1",
      title: "Help Build a School",
      goalAmount: 5000,
      raisedAmount: 3200,
      status: "Under Review", // Can be "Under Review", "Active", "Completed"
    },
    {
      id: "2",
      title: "Medical Support for Alex",
      goalAmount: 10000,
      raisedAmount: 7500,
      status: "Active",
    },
    {
      id: "3",
      title: "Clean Water Initiative",
      goalAmount: 2000,
      raisedAmount: 2000,
      status: "Completed",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Campaigns</h1>

      {campaigns.length === 0 ? (
        <p className="text-gray-500">You haven't created any campaigns yet.</p>
      ) : (
        <ul className="space-y-4">
          {campaigns.map((campaign) => (
            <li
              key={campaign.id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{campaign.title}</h2>
                <p className="text-gray-600">
                  Goal: ${campaign.goalAmount.toLocaleString()} • Raised: $
                  {campaign.raisedAmount.toLocaleString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-lg ${
                  campaign.status === "Under Review"
                    ? "bg-yellow-200 text-yellow-800"
                    : campaign.status === "Active"
                    ? "bg-green-200 text-green-800"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {campaign.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCampaignsTab;
