import { PiSignInBold } from "react-icons/pi";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import NavLink from "./ui/NavLink";

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
      className={`fixed top-0 z-50 sm:px-28 px-12 py-4 flex items-center justify-between flex-grow transition-all duration-300 transition-backdrop ${
        isBeyondHero
          ? "bg-white/90 text-gray-700 shadow-lg border-2 left-8 right-8 mt-4 rounded-full border-customTealLight font-semibold "
          : isScrolling
          ? "w-full backdrop-blur-md text-white "
          : " w-full text-white backdrop-blur-none bg-gradient-to-b from-black/90 to-black/0"
      }`}
    >
      <div className="flex gap-x-8 items-center text-sm">
        <h1 className="text-xl font-inter text-customTeal">
          SewLe<span className="font-bold">Sew</span>
        </h1>

        <NavLink>Disasters</NavLink>
        <NavLink>Charity</NavLink>
        <NavLink>Events</NavLink>
      </div>
      <div className="flex gap-4 items-center">
        <Button
          variant="primary"
          size="md"
          shape="rounded"
          className="flex gap-1"
        >
          <PiSignInBold /> Signin
        </Button>
        <Button
          variant="secondary"
          size="md"
          shape="rounded"
          className="flex gap-1"
        >
          <PiSignInBold /> Create
        </Button>
      </div>
    </div>
  );
};

export default Nav;
