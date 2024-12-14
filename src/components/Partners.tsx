import chapaLogo from "../assets/chapa-logo.png";
import telebirrLogo from "../assets/Telebirr.png";
import safaricom from "../assets/safaricom.png";
import redCross from "../assets/redCross.png";
import redCrescent from "../assets/redCrescent.png";
import ethOrthodox from "../assets/ethOrhodox.png";

import eTelecom from "../assets/ethio-telecom-1200px-logo.png";
import ContactCard from "./ui/contactCard";

const Partners = () => {
  return (
    <div>
      <p className="font-light text-gray-700 text-xs my-4">OUR PARTNERS</p>
      <h1 className="text-3xl font-bold leading-12 ">
        More Than<span className="text-customTeal"> 10 </span>{" "}
        <span className="text-customTeal">Companies</span> and{" "}
        <span className="text-customTeal">Institutions</span> that trust us over
        the years.
      </h1>

      <div className="flex flex-row flex-wrap gap-1 lg:gap-6 mt-2 lg:mt-4 items-center py-10">
        <a href="https://redcrosseth.org/" target="_blank" rel="noreferrer">
          <img
            src={redCross}
            alt="pr1"
            className="object-contain filter md:grayscale hover:scale-110 hover:filter-none duration-200 w-20 lg:w-30"
          />
        </a>
        <a href="https://chapa.co/" target="_blank" rel="noreferrer">
          <img
            src={chapaLogo}
            alt="pr1"
            className="object-contain filter md:grayscale hover:scale-110 hover:filter-none duration-200 w-24 lg:w-40"
          />
        </a>
        <a href="https://ethiotelebirr.com/" target="_blank" rel="noreferrer">
          <img
            src={telebirrLogo}
            alt="pr1"
            className="object-contain filter md:grayscale hover:scale-110 hover:filter-none duration-200 w-22 lg:w-36"
          />
        </a>
        <a
          href="https://www.ethiopianorthodox.org/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={ethOrthodox}
            alt="pr1"
            className="object-contain filter md:grayscale hover:scale-110 hover:filter-none duration-200 w-20 lg:w-30"
          />
        </a>
        <a href="https://www.ethiotelecom.et/" target="_blank" rel="noreferrer">
          <img
            src={eTelecom}
            alt="pr1"
            className="object-contain filter md:grayscale hover:scale-110 hover:filter-none duration-200 w-24 lg:w-40"
          />
        </a>
        <a href="https://www.ifrc.org/" target="_blank" rel="noreferrer">
          <img
            src={redCrescent}
            alt="pr1"
            className="object-contain filter md:grayscale hover:scale-110 hover:filter-none duration-200 w-10 lg:w-20"
          />
        </a>
        <a href="https://safaricom.et/" target="_blank" rel="noreferrer">
          <img
            src={safaricom}
            alt="pr1"
            className="object-contain filter md:grayscale hover:scale-110 hover:filter-none duration-200 w-24 lg:w-40"
          />
        </a>
      </div>

      <ContactCard />
    </div>
  );
};

export default Partners;
