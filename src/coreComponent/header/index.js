import React from "react";
import SVG from "react-inlinesvg";
import { headerIcon } from "../../icons";
import "./style.scss";
const Header = () => {
  return (
    <div className="header">
      <SVG width={25} height={25} className="header-icon" src={headerIcon} />
    </div>
  );
};

export default Header
