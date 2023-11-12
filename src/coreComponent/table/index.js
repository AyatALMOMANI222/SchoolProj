/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import "./style.scss";
import { arrowDown, arrowUp, sortIcon } from "../../icons";

const Table = ({
  id,
  headCells,
  data,
  sort,
  setSort,
  currentHeadCell,
  setCurrentHeadCell,
  fallback,
  footer,
  onRowClick,
  selectableRow = false,
  selectedRowId,
  rowDataId,
}) => {
  const setSortingValue = (headCell) => {
    setSort((prev) => {
      if (headCell.id !== currentHeadCell) {
        setCurrentHeadCell(headCell.id);
        return `asc`;
      } else if (headCell.id === currentHeadCell && prev?.includes("asc")) {
        return `desc`;
      } else {
        setCurrentHeadCell("");
        return "";
      }
    });
  };

  const setSortIcon = (currenLabel, columnName, sortable, onClick) => {
    if (sortable) {
      if (sort?.includes("asc") && columnName === currentHeadCell) {
        return <SVG className="asc-arrow" src={arrowDown} onClick={onClick} />;
      } else if (sort?.includes("desc") && columnName === currentHeadCell) {
        return <SVG className="desc-arrow" src={arrowUp} onClick={onClick} />;
      } else {
        return (
          <SVG
            className="default-sort-arrow"
            src={sortIcon}
            onClick={onClick}
          />
        );
      }
    }
  };

  return (
    <div className="table-section-container">
      <div className="table-container">
        <table id={id || ""} className="table">
          <thead className="table-head">
            <tr>
              {headCells?.map((headCell) => (
                <th
                  key={headCell.id}
                  className={`table-head-cell ${headCell.classes || ""}`}
                >
                  <div
                    className="head-container"
                    data-id={`${headCell.label
                      .toUpperCase()
                      .replace(/[^a-zA-Z0-9s]+/g, "_")}_COLUMN`}
                  >
                    {headCell.label}
                    {setSortIcon(
                      headCell.label,
                      headCell.id,
                      headCell.sortable,
                      () => {
                        if (headCell.sortable && data?.length > 0) {
                          return setSortingValue(headCell);
                        }
                      }
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-body" data-id="TABLE_BODY">
            {data?.length > 0 ? (
              data?.map((row, rowIndex) => {
                return (
                  <tr
                    key={rowIndex}
                    onClick={() => {
                      onRowClick && onRowClick(row.id);
                    }}
                    data-i={rowDataId}
                    className={`row ${
                      selectedRowId === row.id &&
                      selectableRow &&
                      "row-selected"
                    }`}
                  >
                    {headCells?.map((headCell) => {
                      return headCell?.tooltip && row[headCell.id] !== "_" ? (
                        <td key={headCell.id}></td>
                      ) : (
                        <td key={headCell.id}>{row[headCell.id]}</td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr className="fallback-table-row">
                {fallback ? (
                  <td colSpan={headCells?.length}>{fallback}</td>
                ) : (
                  <td
                    className="fallback-container"
                    colSpan={headCells?.length}
                  >
                    <div className="fallback-text-container">
                      <span className="fallback-text"> No Data Available</span>
                    </div>
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {footer && <div className="table-footer-container">{footer}</div>}
    </div>
  );
};

Table.propTypes = {
  id: PropTypes.string,
  headCells: PropTypes.array,
  data: PropTypes.array,
  setSort: PropTypes.func,
  currentHeadCell: PropTypes.string,
  setCurrentHeadCell: PropTypes.func,
  setPage: PropTypes.func,
  fallback: PropTypes.node,
  footer: PropTypes.node,
};

export default Table;
