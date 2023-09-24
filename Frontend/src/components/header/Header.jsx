import React from "react";

//adding up componenents
import Logo from "../../assets/img/ethereum.png";
import Nav from "../nav/Nav";
import AccountBtns from "../button/AccountBtns";

//import icons
import { CgMenuRight, CgmenuRight } from "react-icons/cg";

const Header = ({ setNavMobile }) => {
  //to open open drawer
  const handleClick = () => {
    setNavMobile(true);
  };

  return (
    <header
      className="py-[30px] lg:pt-[60px]"
      data-aos="fade-down"
      data-aos-delay="400"
      data-aos-duration="2000"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* logo */}
        <a href="#/">
          <img src={Logo} alt="logo" />
        </a>
      </div>
    </header>
  );
};

export default Header;
