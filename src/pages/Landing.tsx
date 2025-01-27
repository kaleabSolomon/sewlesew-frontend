import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Donations from "@/components/Donations";
import Faq from "@/components/Faq";
import Stats from "@/components/Stats";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { getCampaigns } from "@/services/campaign";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [meta, setMetadata] = useState({});

  const handleError = (err: string) => {
    setError(err);
  };

  const handleIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await getCampaigns(
          handleIsLoading, // Pass loading handler
          handleError // Pass error handler
        );

        setCampaigns(res.data);
        setMetadata(res.metadata);
      } catch (err) {
        // The error is already handled in the `getCampaigns` function
        console.error("Error fetching campaigns:", err);
      }
    };

    fetchCampaigns();
  }, []);
  return (
    <div>
      <Nav />
      <div className="w-screen h-[1000px] bg-heroImg bg-center bg-cover bg-no-repeat ">
        <div className="h-full w-full bg-black bg-clip-padding backdrop-filter bg-opacity-70">
          <Hero />
        </div>
      </div>
      <div
        className="max-w-6xl mx-auto
       my-16 px-4 sm:px-6 lg:px-8"
      >
        <Donations
          isLoading={isLoading}
          error={error}
          campaigns={campaigns}
          meta={meta}
        />
        <Faq />
        <Stats />
        <Partners />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
