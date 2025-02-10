import ProfileContent from "@/components/profile/ProfileContent";
import ProfileSidebar from "@/components/profile/ProfileSideBar";
import { useState } from "react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "myCampaigns" | "editProfile" | "settings"
  >("profile");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Area */}
      <ProfileContent activeTab={activeTab} />
    </div>
  );
};

export default ProfilePage;
