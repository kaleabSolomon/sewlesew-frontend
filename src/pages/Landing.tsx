import Hero from "@/components/Hero";
import Nav from "../components/Nav";

const Landing = () => {
  return (
    <div className="w-screen h-[1000px] bg-heroImg bg-center bg-cover bg-no-repeat ">
      <div className="h-full w-full bg-black bg-clip-padding backdrop-filter bg-opacity-70">
        <Nav />
        <Hero />
      </div>

      <div className="h-[2000px]">hello</div>
    </div>
  );
};

export default Landing;
