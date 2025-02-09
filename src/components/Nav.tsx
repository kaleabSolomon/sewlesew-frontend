import { PiSignInBold } from "react-icons/pi";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import NavLink from "./ui/NavLink";
import { IoAddCircleSharp, IoClose } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { FaUser } from "react-icons/fa";
import { getUserBrief } from "@/services/user";
import DropDown from "./ui/DropDown";
import { userBrief } from "@/types/user";
import LogoutBtn from "./ui/LogoutBtn";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolling, setIsScrolling] = useState(false);
  const [isBeyondHero, setIsBeyondHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [profile, setProfile] = useState<userBrief | null>(null);

  const isHome = location.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling((prev) => (prev ? prev : true)); // Only update if needed

      setIsBeyondHero(window.scrollY > 1000);

      // Clear previous timeout
      clearTimeout(scrollTimeout);

      // Set timeout to detect stop scrolling
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile((prev) => {
        const newValue = window.innerWidth < 1024;
        return prev !== newValue ? newValue : prev; // Only update if changed
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run once to initialize state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pf = await getUserBrief();

        const {
          id,
          firstName,
          lastName,
          email,
          phoneNumber,
          dateOfBirth,
          profilePicture,
        } = pf;

        setProfile({
          id,
          firstName,
          lastName,
          email,
          phoneNumber,
          dateOfBirth,
          profilePicture,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 sm:px-28 px-12 py-4 flex items-center justify-between  flex-grow transition-all duration-300 transition-backdrop ${
        isBeyondHero || !isHome
          ? "bg-teal-50/90 text-gray-700 shadow-lg border-2 left-8 right-8 mt-4 rounded-full  border-customTealLight font-semibold"
          : isScrolling
          ? "w-full backdrop-blur-md text-white"
          : "w-full text-white backdrop-blur-none bg-gradient-to-b from-black/90 to-black/0"
      }`}
    >
      {/* Left Side */}
      <Link to="/" className="text-xl font-inter text-customTeal">
        SewLe<span className="font-bold">Sew</span>
      </Link>

      {/* Right Side */}
      <div className="flex gap-4 items-center">
        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-x-8 items-center text-sm">
          <NavLink to="/stories">Stories</NavLink>
          <NavLink to="/campaigns">Campaigns</NavLink>
          <Button
            variant="secondary"
            size="md"
            shape="rounded"
            className="flex gap-1"
            onClick={() => navigate("/campaign/create")}
          >
            <IoAddCircleSharp size={20} /> Create Campaign
          </Button>
        </div>

        {/* Authenticated User Profile (Desktop) */}
        {isAuthenticated() ? (
          <div className="flex gap-x-2 items-center">
            <button
              className="h-10 w-10 rounded-full bg-customTeal flex items-center justify-center"
              onClick={toggleMenu}
            >
              {profile && profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="profile"
                  className="rounded-full"
                />
              ) : (
                <FaUser size={16} color="white" />
              )}
            </button>
            <h1>Hello, {profile?.firstName}</h1>
          </div>
        ) : isMobile ? (
          <Button
            variant="ghost"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="text-customTeal hover:text-customTealLight"
          >
            {isMenuOpen ? <IoClose size={24} /> : <CiMenuFries size={24} />}
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            shape="rounded"
            className="flex gap-1"
            onClick={() => navigate("/auth/signin")}
          >
            <PiSignInBold /> Signin
          </Button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <DropDown
          isBeyondHero={isBeyondHero}
          isMenuOpen={isMenuOpen}
          isHome={isHome}
        >
          {/* Desktop & Authenticated */}
          {!isMobile && isAuthenticated() && (
            <div className="flex flex-col items-center gap-4">
              <NavLink to="/Profile">
                <FaUser />
                Profile
              </NavLink>
              <LogoutBtn />
            </div>
          )}
          {isMobile && isAuthenticated() && (
            <div className="flex flex-col items-center gap-4">
              <NavLink to={"/campaigns"}>Campaigns</NavLink>
              <NavLink to={"/stories"}>Stories</NavLink>

              <NavLink to="/campaigns">My Campaigns</NavLink>
              <NavLink to="/settings">Settings</NavLink>
              <Button
                variant="secondary"
                size="md"
                shape="rounded"
                className="flex gap-1 "
                onClick={() => navigate("/campaign/create")}
              >
                <IoAddCircleSharp size={20} /> Create Campaign
              </Button>
              <LogoutBtn />
            </div>
          )}

          {isMobile && !isAuthenticated() && (
            <div className="flex flex-col items-center gap-4">
              <NavLink to={"/campaigns"}>Campaigns</NavLink>
              <NavLink to={"/stories"}>Stories</NavLink>

              <Button
                variant="secondary"
                size="md"
                shape="rounded"
                className="flex gap-1 "
                onClick={() => navigate("/campaign/create")}
              >
                <IoAddCircleSharp size={20} /> Create Campaign
              </Button>
              <Button
                variant="primary"
                size="md"
                shape="rounded"
                className="flex gap-1 "
                onClick={() => navigate("/auth/signin")}
              >
                <PiSignInBold /> Signin
              </Button>
            </div>
          )}
        </DropDown>
      )}
    </div>
  );
};

export default Nav;
