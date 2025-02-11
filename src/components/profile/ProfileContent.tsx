import MyCampaignsTab from "./MyCampaignsTab";
import ProfileTab from "./ProfileTab";
import SettingsTab from "./SettingsTab";
import DonationHistoryTab from "./DonationHistory";

type Props = {
  activeTab: "profile" | "myCampaigns" | "settings" | "donationHistory";
};

const ProfileContent = ({ activeTab }: Props) => {
  return (
    <div className="w-[800px] p-6 bg-white shadow-md rounded-lg border border-customTeal">
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "myCampaigns" && <MyCampaignsTab />}
      {activeTab === "settings" && <SettingsTab />}
      {activeTab === "donationHistory" && <DonationHistoryTab />}
    </div>
  );
};

export default ProfileContent;
