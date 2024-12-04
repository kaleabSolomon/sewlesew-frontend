import { PiSignInBold } from "react-icons/pi";
import Button from "./ui/Button";
import { useEffect, useState } from "react";

const Nav = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isBeyondHero, setIsBeyondHero] = useState(false);
  useEffect(() => {
    let scrollTimeout: string | number | NodeJS.Timeout | undefined;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Set isScrolling to true when the user scrolls
      setIsScrolling(true);

      if (scrollY > 1000) {
        setIsBeyondHero(true);
      } else {
        setIsBeyondHero(false);
      }

      // Clear the timeout if it's already running
      clearTimeout(scrollTimeout);

      // Set a timeout to remove the effect after the user stops scrolling
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200); // Adjust timeout duration as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 sm:px-28 px-8 py-4 flex items-center justify-between text-white transition-backdrop${
        isBeyondHero
          ? "bg-white text-black shadow-lg"
          : isScrolling
          ? " backdrop-blur-md "
          : "backdrop-blur-none bg-gradient-to-b from-black/90 to-black/0"
      }`}
    >
      <div className="flex gap-x-8 items-center text-sm">
        <h1 className="text-xl font-inter text-customTeal">
          Kena<span className="font-bold">Lib</span>
        </h1>
        <h2 className="hover:text-customTealLight transition-colors duration-200">
          Home
        </h2>
        <h2 className="hover:text-customTealLight transition-colors duration-200">
          Disasters
        </h2>
        <h2 className="hover:text-customTealLight transition-colors duration-200">
          Charity
        </h2>
        <h2 className="hover:text-customTealLight transition-colors duration-200">
          Events
        </h2>
      </div>
      <div className="flex gap-1 items-center">
        <Button
          variant="ghost"
          size="md"
          shape="rounded"
          className="flex gap-1"
        >
          <PiSignInBold /> Signin
        </Button>
        <h1 className="text-sm">(+251)9-4210-2626</h1>
      </div>
    </div>
  );
};

export default Nav;
