import React, { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import ReadOnlyField from "../readOnlyField";
import {
  copyIcon,
  showPasswordIcon,
  hidePasswordIcon,
  clearIcon,
} from "../../icons";

import "./style.scss";

const Input = ({
  placeholder,
  type,
  onChange,
  onClear,
  name,
  size,
  value,
  label,
  successfullInput,
  errorMessage,
  disabled,
  clearable = false,
  digitLimit,
  icon,
  required,
  onlyEnglish = false,
  optional = false,
  onKeyDown,
  onFocus,
  dataId,
  labelDataId,
  searchDataId,
  ref,
}) => {
  const [error, setError] = useState("");
  const clearRef = useRef(null);
  const [hide, setHide] = useState(true);
  const Englishcharacters = /^[\u0020-\u007E]+$/;

  useEffect(() => {
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError("");
    }
  }, [errorMessage]);

  const handleChange = ({ target: { name, value } }) => {
    if (Englishcharacters.test(value) || value == "" || !onlyEnglish) {
      const maxDigits = digitLimit || Infinity;
      if (value.length > maxDigits) {
        value = value.slice(0, maxDigits);
      }

      if (type === "number") {
        if (value.charAt(0) === "0") {
          value = value.replace(/^0+/, "");
        }
        value = value.replace(/\D/g, "");
        onChange(value);
      } else if (type === "email") {
        setError(!isValidEmail(value) && "Email not valid");
        onChange(value);
      } else {
        onChange(value);
      }
    }
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleCopy = () => {
    if (ref) {
      ref.current.select();
    } else {
      clearRef.current.select();
    }

    document.execCommand("copy");
  };
  const typePhone = (event) => {
    if (!event.key?.match("[0-9]") && !(event.key === "+")) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  return (
    <Fragment>
      {disabled ? (
        <ReadOnlyField
          size={size}
          value={value}
          label={label}
          required={required}
          optional={optional}
          type={type}
          placeholder={placeholder}
        />
      ) : (
        <div
          className={`text-field ${successfullInput ? "success" : ""} ${
            error ? "errorMessage" : ""
          } ${disabled ? "disabled" : ""}`}
        >
          {label && (
            <div className="container-label">
              <span className="label" data-id={labelDataId}>
                {label}
                {required ? <span className="star-require">*</span> : ""}
              </span>
              {optional && <span className="optinal">(Optional)</span>}
            </div>
          )}
          <div className={`container-input-field container-${type}`}>
            <input
              ref={ref || clearRef}
              data-id={dataId || searchDataId}
              className={`input-field ${size} ${type} ${
                clearable && "clearable"
              }`}
              placeholder={placeholder}
              onChange={handleChange}
              name={name}
              disabled={disabled}
              type={hide ? type : "text"}
              onKeyPress={type == "phone" ? typePhone : null}
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              value={value}
              min="1"
            />

            <div className="icons-container">
              {clearable && value && (
                <SVG
                  src={clearIcon}
                  width={16}
                  height={16}
                  onClick={() => {
                    onClear();
                    clearRef.current.focus();
                  }}
                  className="clear-icon"
                  data-id="CLEAR_ICON_SEARCH_INPUT"
                />
              )}
              {type === "password" ? (
                <SVG
                  src={hide ? hidePasswordIcon : showPasswordIcon}
                  width={17.5}
                  height={17.5}
                  onClick={() => (value ? setHide(!hide) : "")}
                  className={`password-icon${!value ? "-disabled" : ""}`}
                />
              ) : null}
              {type === "secret" ? (
                <SVG
                  src={copyIcon}
                  width={24}
                  height={24}
                  onClick={handleCopy}
                  className={`secret-icon ${!value && "disabled"}`}
                />
              ) : null}
              <div
                className={`prop-icon ${value && "active-content"}`}
                data-id="SEARCH_ICON"
              >
                {icon && icon}
              </div>
            </div>
            {type == "url" && <div className="url-section">/</div>}
          </div>
          {error && <span className="error-msg"> {error} </span>}
        </div>
      )}
    </Fragment>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  successfullInput: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
};

export default Input;
