type Props = {
  activeTab: string;
  setActiveTab: (
    tab:
      | "profile"
      | "myCampaigns"
      | "editProfile"
      | "settings"
      | "donationHistory"
  ) => void;
};

const ProfileSidebar = ({ activeTab, setActiveTab }: Props) => {
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "myCampaigns", label: "My Campaigns" },
    {
      id: "donationHistory",
      label: "Donation History",
    },
    { id: "editProfile", label: "Edit Profile" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-4 rounded-lg border border-customTeal">
      <h2 className="text-lg font-semibold mb-4">Menu</h2>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`cursor-pointer p-3 rounded-r-md mt-2 ${
              activeTab === tab.id
                ? "border-l-4 border-customTealDark bg-customTealDark/20 "
                : "hover:bg-customTealDark/20"
            }`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
