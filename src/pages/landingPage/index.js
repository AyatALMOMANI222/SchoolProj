import React from "react";
import "./style.scss";
import { sectionIcon, arrowRight } from "../../icons";
import SVG from "react-inlinesvg";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const sections = [
    [{ sectionName: "الصف التاسع" , num:"التاسع"}],
    [{ sectionName: "الصف العاشر" , num:"العاشر" }],
    [{ sectionName: "الصف الاول ثانوي"  , num:"الاول ثانوي"}],
    [{ sectionName: "الصف الثاني ثانوي" , num:"الثاني ثانوي" }],
  ];
  const navigate=useNavigate()
  return (
    <div className="landing-page-container">
      <div className="sections-container">
        {sections?.map((item) => {
          return (
            <div className="section-name" onClick={()=>{
              navigate(`/main/${item[0].num}`)
            }}>
              <SVG
                className="section-icon"
                height={50}
                width={50}
                src={sectionIcon}
              />
              <span>{item[0].sectionName}</span>
              <SVG
                className="arrow-right"
                height={30}
                width={30}
                src={arrowRight}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
