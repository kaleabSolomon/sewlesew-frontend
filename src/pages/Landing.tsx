import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import Stats from "@/components/Stats";
import Partners from "@/components/Partners";
import { useEffect, useState } from "react";
import { getCampaigns } from "@/services/campaign";
import Campaigns from "@/components/Campaigns";
import { GrLinkNext } from "react-icons/gr";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async (page?: number, limit?: number) => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getCampaigns(page, limit);

        setCampaigns(data.data); // Update campaigns state
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns(1, 6);
  }, []);

  return (
    <div>
      <div className="w-screen h-[1000px] bg-heroImg bg-center bg-cover bg-no-repeat ">
        <div className="h-full w-full bg-black bg-clip-padding backdrop-filter bg-opacity-70">
          <Hero />
        </div>
      </div>
      <div
        className="max-w-6xl mx-auto
       my-16 px-4 sm:px-6 lg:px-8"
      >
        {/* <Donations /> */}

        <div className="flex flex-col  items-center py-10 gap-y-10 mb-16">
          <h1 className="font-semibold text-4xl ">
            Featured <span className="text-customTeal ">Campaigns</span>
          </h1>

          <Campaigns
            isLoading={isLoading}
            error={error}
            campaigns={campaigns}
          />

          <Button
            className="flex gap-2 place-self-end"
            shape="rounded"
            onClick={() => {
              navigate("/campaigns");
            }}
          >
            See More <GrLinkNext />
          </Button>
        </div>
        <Faq />
        <Stats />
        <Partners />
      </div>
    </div>
  );
};

export default Landing;
