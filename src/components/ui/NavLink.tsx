import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className="py-1 relative before:content-[''] after:content-[''] before:absolute after:absolute before:bottom-0 after:bottom-0  before:h-[2px] after:h-[2px] 
         before:w-0 after:w-0 before:left-0 after:right-0 before:bg-customTealLight after:bg-customTealLight hover:before:w-1/2 hover:after:w-1/2 before:transition-all before:duration-200 before:ease-linear after:transition-all after:duration-200 after:ease-linear hover:text-customTealDark hover:scale-110 flex items-center justify-center gap-x-2 transition-all duration-200"
    >
      {children}
    </Link>
  );
};

export default NavLink;
