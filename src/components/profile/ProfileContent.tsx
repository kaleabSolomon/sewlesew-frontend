import EditProfileTab from "./EditProfileTab";
import MyCampaignsTab from "./MyCampaignsTab";
import ProfileTab from "./ProfileTab";
import SettingsTab from "./SettingsTab";

type Props = {
  activeTab: "profile" | "myCampaigns" | "editProfile" | "settings";
};

const ProfileContent = ({ activeTab }: Props) => {
  return (
    <div className="w-3/4 p-6 bg-white shadow-md rounded-lg">
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "myCampaigns" && <MyCampaignsTab />}
      {activeTab === "editProfile" && <EditProfileTab />}
      {activeTab === "settings" && <SettingsTab />}
    </div>
  );
};

export default ProfileContent;
