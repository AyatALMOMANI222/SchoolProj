import React from "react";
import SVG from "react-inlinesvg";
import { Link, useLocation } from "react-router-dom";
import { studentIcon } from "../../icons";

import "./style.scss";
const SideDrower = () => {
  const location = useLocation();
  const pages = [
    { name: "Students", icon: studentIcon, path: "/main" },
    { name: "Sections", icon: studentIcon, path: "/sections" },
    { name: "Add New Student", icon: studentIcon, path: "/newstudent" }
  ];
  return (
    <div className={`side-drower-container`}>
      <div className={`app-name`}>
    
        <span className="title">School </span>
      </div>
      {pages?.map((item) => {
        return (
          <div
            className={`page-name ${
              location.pathname === item.path && "active"
            }`}
          >
            <SVG
              width={25}
              height={25}
              className="student-icon"
              src={item?.icon}
            />
            <Link className="title" to={`${item.path}`}>
              {item?.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SideDrower;
