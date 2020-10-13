import React from "react";
import PropTypes from "prop-types";

// CSS
import "./table.scss";

const Table = (props) => {
  const { headerRowArr, rowsArr } = props;

  return (
    <div className="table-container">
      <table>
        {headerRowArr && (
          <thead>
            <tr className="table-header-row">
              {headerRowArr &&
                headerRowArr.map((item, i) => {
                  return <th key={`header-${i}`}>{item}</th>;
                })}
            </tr>
          </thead>
        )}
        {rowsArr && (
          <tbody>
            {rowsArr &&
              rowsArr.map((row, i) => (
                <tr key={`row-${i}`} className="table-body-row">
                  {row.map((item, i) => {
                    return <td key={`td-${i}`}>{item}</td>;
                  })}
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

Table.propTypes = {
  rowsArr: PropTypes.array,
  headerRowArr: PropTypes.array,
};

export default Table;
