import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Donations from "@/components/Donations";
import Faq from "@/components/Faq";

const Landing = () => {
  return (
    <div>
      <Nav />
      <div className="w-screen h-[1000px] bg-heroImg bg-center bg-cover bg-no-repeat ">
        <div className="h-full w-full bg-black bg-clip-padding backdrop-filter bg-opacity-70">
          <Hero />
        </div>
      </div>
      <div className="mx-96 my-16  ">
        <Donations />
        <Faq />
      </div>
    </div>
  );
};

export default Landing;
