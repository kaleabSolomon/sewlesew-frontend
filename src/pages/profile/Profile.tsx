import ProfileContent from "@/components/profile/ProfileContent";
import ProfileSidebar from "@/components/profile/ProfileSideBar";
import { useState } from "react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "myCampaigns" | "settings" | "donationHistory"
  >("profile");

  return (
    <div className="flex items-start justify-center mt-32 mx-44 min-h-screen gap-x-5 ">
      {/* Sidebar */}
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Area */}
      <ProfileContent activeTab={activeTab} />
    </div>
  );
};

export default ProfilePage;
