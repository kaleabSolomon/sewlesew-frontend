import { PiSignInBold } from "react-icons/pi";
import Button from "./ui/Button";
import { useEffect, useRef, useState } from "react";
import NavLink from "./ui/NavLink";
import { IoAddCircleSharp, IoClose } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { FaUser } from "react-icons/fa";

const Nav = () => {
  const navigate = useNavigate();

  const [isScrolling, setIsScrolling] = useState(false);
  const [isBeyondHero, setIsBeyondHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log(isMenuOpen);
  };
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 sm:px-28 px-12 py-4 flex items-center justify-between flex-grow transition-all duration-300 transition-backdrop ${
        isBeyondHero || isAuthenticated()
          ? "bg-teal-50/90 text-gray-700 shadow-lg border-2 left-8 right-8 mt-4 rounded-full border-customTealLight font-semibold"
          : isScrolling
          ? "w-full backdrop-blur-md text-white"
          : "w-full text-white backdrop-blur-none bg-gradient-to-b from-black/90 to-black/0"
      }`}
    >
      {/* Left Side */}
      <div className="flex gap-x-8 items-center text-sm">
        <h1 className="text-xl font-inter text-customTeal">
          SewLe<span className="font-bold">Sew</span>
        </h1>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-8">
          <NavLink>Disasters</NavLink>
          <NavLink>Charity</NavLink>
          <NavLink>Events</NavLink>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex gap-4 items-center">
        <Button
          variant="secondary"
          size="md"
          shape="rounded"
          className="flex gap-1"
        >
          <IoAddCircleSharp size={20} /> Create Campaign
        </Button>

        {isAuthenticated() ? (
          <div className="h-10 w-10 rounded-full bg-customTeal flex items-center justify-center ">
            <FaUser size={16} color="white" />
          </div>
        ) : (
          <Button
            variant="primary"
            size="md"
            shape="rounded"
            className="flex gap-1"
            onClick={() => {
              navigate("/auth/signin");
            }}
          >
            <PiSignInBold /> Signin
          </Button>
        )}
      </div>

      {/* Hamburger Menu Button */}
      <div className="lg:hidden ">
        <Button
          // className="text-3xl focus:outline-none"
          variant="ghost"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="text-customTeal hover:text-customTealLight"
        >
          {isMenuOpen ? <IoClose size={24} /> : <CiMenuFries size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className={`lg:hidden absolute top-full w-60 right-8 text-gray-700 shadow-md flex flex-col items-center gap-4 py-4  border border-customTealLight rounded-lg transition-all mt-2 duration-300 transform ${
            isBeyondHero || isAuthenticated()
              ? "bg-white/90"
              : "text-white backdrop-blur-md"
          } ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <NavLink>Disasters</NavLink>
          <NavLink>Charity</NavLink>
          <NavLink>Events</NavLink>
          <Button
            variant="secondary"
            size="md"
            shape="rounded"
            className="flex gap-1 w-10/12"
          >
            <IoAddCircleSharp size={20} /> Create Campaign
          </Button>
          <Button
            variant="primary"
            size="md"
            shape="rounded"
            className="flex gap-1 w-10/12"
          >
            <PiSignInBold /> Signin
          </Button>
        </div>
      )}
    </div>
  );
};

export default Nav;
