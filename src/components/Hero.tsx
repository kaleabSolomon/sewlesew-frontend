import { FaCirclePlay } from "react-icons/fa6";
import Button from "./ui/Button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white ">
      <p className="font-bold text-6xl flex flex-col items-center">
        <p>
          <span className="text-customTeal ">Happiness </span>
          comes from
        </p>
        <p className="text-customTeal">your action</p>
      </p>
      <p className="text-gray-300 italic m-5 text-lg">
        Be a part of the breakthrough and make someone's dream come true
      </p>

      <div className="space-x-5">
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
        >
          <FaCirclePlay />
          Watch Video
        </Button>
      </div>
    </div>
  );
};

export default Hero;
