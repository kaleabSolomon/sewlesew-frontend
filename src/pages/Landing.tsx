import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Donations from "@/components/Donations";
import Faq from "@/components/Faq";
import Stats from "@/components/Stats";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

const Landing = () => {
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
       my-16 border-2 border-black  px-4 sm:px-6 lg:px-8"
      >
        <Donations />
        <Faq />
        <Stats />
        <Partners />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
