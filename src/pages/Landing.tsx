import Nav from "../components/Nav";

const Landing = () => {
  return (
    <div className="w-screen min-h-screen bg-heroImg bg-center bg-cover bg-no-repeat ">
      <div className="h-screen w-full bg-black bg-clip-padding backdrop-filter bg-opacity-50"></div>
      <Nav />
    </div>
  );
};

export default Landing;
