import React from "react";

interface DropDownProps {
  isBeyondHero: boolean;
  isHome: boolean;
  isMenuOpen: boolean;
  children: React.ReactNode;
}

const DropDown: React.FC<DropDownProps> = ({
  isBeyondHero,
  isMenuOpen,
  isHome,
  children,
}) => {
  return (
    <div
      className={`absolute top-full w-48 right-8 text-gray-700 shadow-md flex flex-col items-center gap-4 py-4  border border-customTealLight rounded-lg transition-all mt-2 duration-300 transform ${
        isBeyondHero || !isHome ? "bg-white/90" : "text-white backdrop-blur-md"
      } ${
        isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default DropDown;
