import { CampaignTypeCard } from "@/components/campaignCreation/CampaignTypeCard";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaBriefcase } from "react-icons/fa";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function CampaignSelection() {
  const navigate = useNavigate();

  return (
    <div className="mt-32 lg:mt-0 flex flex-col items-center justify-center min-h-screen p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Start Your Campaign Today
      </h1>

      {/* Description */}
      <p className="text-lg mb-12 text-center text-gray-600 lg:w-1/2">
        Whether you're starting a new business, supporting a cause, or raising
        funds for a personal goal, we make it easy for you to launch and manage
        your campaign. Choose the campaign type that best fits your needs, and
        let’s get started!
      </p>

      {/* Campaign Type Cards */}
      <div className="flex flex-col lg:flex-row items-center gap-10 w-full max-w-4xl">
        <CampaignTypeCard
          key="business"
          title="Business Campaign"
          description="Ideal for startups, product launches, or expanding your business."
          onClick={() => navigate(`/campaign/create/business`)}
          icon={<FaBriefcase />}
        />
        <CampaignTypeCard
          key="charity"
          title="Charity Campaign"
          description="Raise funds for a social cause, nonprofit, or humanitarian effort."
          onClick={() => navigate(`/campaign/create/charity`)}
          icon={<BiSolidDonateHeart />}
        />
        <CampaignTypeCard
          key="personal"
          title="Personal Campaign"
          description="Perfect for personal emergencies, education, or medical expenses."
          onClick={() => navigate(`/campaign/create/personal`)}
          icon={<FaPersonBreastfeeding />}
        />
      </div>

      {/* Footer/Additional Information */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>
          Need help?{" "}
          <a href="/contact" className="text-customTeal hover:underline">
            Contact our support team
          </a>{" "}
          for assistance with your campaign setup.
        </p>
        <p className="mt-2">
          By starting a campaign, you agree to our{" "}
          <a href="/terms" className="text-customTeal hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-customTeal hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
