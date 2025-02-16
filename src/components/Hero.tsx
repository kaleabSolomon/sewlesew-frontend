import Button from "./ui/Button";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full text-white ">
      <p className="font-bold text-4xl sm:text-6xl flex flex-col items-center">
        <p>
          <span className="text-customTeal ">Happiness </span>
          comes from
        </p>
        <p className="text-customTeal">your action</p>
      </p>
      <p className="text-gray-300 italic m-5 text-sm sm:text-lg">
        Be a part of the breakthrough and make someone's dream come true
      </p>

      <div className="sm:space-x-5 flex flex-col mt-4 sm:mt-0 gap-4 sm:flex-row sm:gap-0 ">
        <Button
          size="lg"
          variant="primary"
          shape="rounded"
          className="font-normal"
        >
          Donate Now
        </Button>

        <Button
          variant="outline"
          size="lg"
          shape="rounded"
          className="flex gap-2 font-normal"
          onClick={() => navigate("/campaign/create")}
        >
          <IoMdAddCircle /> Create A Campaign
        </Button>
      </div>
    </div>
  );
};

export default Hero;
