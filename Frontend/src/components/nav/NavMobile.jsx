import React from "react";

//import data
import { navData } from "../../data";
//import icons
import { CgClose } from "react-icons/cg";

const NavMobile = ({ setNavMobile }) => {
  const handleClick = () => {
    setNavMobile(false);
  };

  return (
    <nav className="lg:hidden bg-slate-300 h-full top-0 bottom-0 w-80 flex justify-center items-center">
      {/* Close Button */}
      <div
        onClick={handleClick}
        className="absolute top-2 left-2 cursor-pointer"
      >
        <CgClose className="text-3xl" />
      </div>
      {/* Menu list */}
      <ul className="text-xl flex flex-col gap-y-8">
        {navData.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.href}>{item.name} </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavMobile;
