import React from "react";
import logo from "../../../images/logo.png";
import SvgComponent from "./Logo";

const Header = () => {
  return (
    <header id="header">
      <img src={logo} alt="" />
    </header>
  );
};

export default Header;
