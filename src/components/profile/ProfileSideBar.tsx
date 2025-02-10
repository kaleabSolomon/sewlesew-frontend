type Props = {
  activeTab: string;
  setActiveTab: (
    tab: "profile" | "myCampaigns" | "editProfile" | "settings"
  ) => void;
};

const ProfileSidebar = ({ activeTab, setActiveTab }: Props) => {
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "myCampaigns", label: "My Campaigns" },
    { id: "editProfile", label: "Edit Profile" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="w-1/4 bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Menu</h2>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`cursor-pointer p-2 rounded-lg ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
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
