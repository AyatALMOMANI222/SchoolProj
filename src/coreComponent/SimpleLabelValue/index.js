import React from "react";
import "./style.scss";

const SimpleLabelValue = ({ label, value, color }) => {
  return (
    <div className="drawer-item-container">
      <span className="title">{label}</span>
      <span className={`text ${color}`}>{value}</span>
    </div>
  );
};

export default SimpleLabelValue;
