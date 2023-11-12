import React from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import { selectFieldDownArrow } from "../../icons";

import "./style.scss";

const ReadOnlyField = ({
  placeholder,
  size,
  value,
  label,
  required,
  optional,
  type,
  inputType,
}) => {
  return (
    <div className="text-field-disabled">
      {label && (
        <div className="container-label">
          <span className="label">
            {label}
            {required ? <span className="star-require">*</span> : ""}
          </span>
          {optional && <span className="optinal">(Optional)</span>}
        </div>
      )}
      <div className={`container-input-field container-${type}`}>
        <input
          className={`input-field ${size} ${type}`}
          placeholder={placeholder}
          value={value}
          readOnly
        />
        {inputType === "select" && (
          <SVG
            src={selectFieldDownArrow}
            className="input-arrow-icon"
            width="24px"
            height="24px"
          />
        )}
      </div>
      {type === "url" && <div className="url-section">/</div>}
    </div>
  );
};

ReadOnlyField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
};

export default ReadOnlyField;
