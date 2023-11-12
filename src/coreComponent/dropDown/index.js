import React, { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import "./styles.scss";
import clearIcon from "../../icons/clearIcon.svg";
import arrowUp from "../../icons/arrowUp.svg";
import arrowDown from "../../icons/arrowDown.svg";

const DropDown = ({
  label,
  placeholder,
  options,
  value,
  size,
  setValue,
  clearable = true,
  errorMessage,
  required,
  dataId,
  labelDataId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [flipDropdown, setFlipDropdown] = useState(false);
  const filterSelect = useRef();
  const dropdown = useRef(null);
  const [error, setError] = useState("");
  const optionRefs = useRef([]);
  const selectRef = useRef("");
  let selectedOptionRef;

  const optionsKeyDown = (e, index, option) => {
    if (e.key === "Enter" || e.key === " ") {
      setValue(option.key);
      setIsOpen(false);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      optionRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index === 0) {
        selectRef.current.focus();
      }
      optionRefs.current[index - 1]?.focus();
    }
  };
  const selectKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (isOpen == true) {
        optionRefs.current[0]?.focus();
      } else {
        setIsOpen(!isOpen);
      }
    }
  };
  useEffect(() => {
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError("");
    }
  }, [errorMessage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterSelect.current &&
        !filterSelect.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterSelect]);

  useEffect(() => {
    if (selectedOptionRef && isOpen) {
      selectedOptionRef.focus();
    }
  }, [isOpen]);

  const formatFirstLetterToUpperCase = (str) => {
    if (str) {
      const words = str.toLowerCase().split("_");
      const formattedWords = words?.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      return formattedWords.join(" ");
    }

    return "";
  };

  const isInViewport = (element) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      const coordinationElement = document.elementFromPoint(
        rect.left + 50,
        rect.bottom - 30
      );
      const foundLastItemInList = Array.from(element.children).find(
        (child) => child == coordinationElement
      );

      const isOverlapped = foundLastItemInList ? 0 : 150;

      return rect.bottom - (window.innerHeight - isOverlapped) >= 100;
    }
  };

  useEffect(() => {
    if (isOpen && dropdown) {
      setFlipDropdown(isInViewport(dropdown.current));
    } else setFlipDropdown(false);
  }, [dropdown, isOpen]);

  return (
    <Fragment>
        <div className="container-filter-select">
          <div className="filter-select" ref={filterSelect}>
            {label && (
              <span className="label" data-id={labelDataId}>
                {label}
                {required ? <span className="star-require">*</span> : ""}
              </span>
            )}
            <div
              className={`input ${size} ${error ? "errorMessage" : ""}`}
              data-id={dataId}
              onClick={() => setIsOpen(!isOpen)}
              tabIndex="0"
              ref={(ref) => (selectRef.current = ref)}
              onKeyDown={(e) => selectKeyDown(e)}
            >
              <div
                className={`placeholder ${value?.length > 0 ? "selected" : ""}`}
              >
                {formatFirstLetterToUpperCase(value) || placeholder}
              </div>
              <div className="icons-container">
                {clearable && value && (
                  <SVG
                    src={clearIcon}
                    width={16}
                    height={16}
                    className="select-clear-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue("");
                      setIsOpen(false);
                    }}
                    data-id="CLEAR_ICON_SELECT_FIELD"
                  />
                )}
                <SVG
                  src={isOpen ? arrowUp : arrowDown}
                  data-id="SELECT_ARROW_ICON"
                  className={`input-arrow-icon ${value && "active-content"}`}
                  width="24px"
                  height="24px"
                />
              </div>
            </div>

            {isOpen && (
              <dropdown
                ref={dropdown}
                className={`dropdown-list ${flipDropdown && "flip-" + size}`}
                tabIndex="1"
                id="nana"
              >
                {options?.map((option, index) => {
                  if (typeof option === "string") {
                    option = {
                      key: option,
                      value: option,
                    };
                  }

                  return (
                    <p
                      value={option.key}
                      data-id={option.key.toUpperCase().replaceAll(" ", "_")}
                      key={option}
                      className={`dropdown-list-item ${
                        option.value.toUpperCase() ===
                        value?.replace(/_/g, " ").toUpperCase()
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => {
                        setValue(option.key);
                        setIsOpen(!isOpen);
                      }}
                      tabIndex="0"
                      ref={(ref) => {
                        if (
                          option.value.toUpperCase() ===
                          value?.replace(/_/g, " ").toUpperCase()
                        ) {
                          selectedOptionRef = ref;
                        }
                        optionRefs.current[index] = ref;
                        return ref;
                      }}
                      onKeyDown={(e) => optionsKeyDown(e, index, option)}
                    >
                      {option.value.replace(/_/g, " ")}
                    </p>
                  );
                })}
              </dropdown>
            )}
          </div>
          {error && <span className="error-msg"> {error} </span>}
        </div>
    </Fragment>
  );
};

DropDown.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  multi: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default DropDown;
