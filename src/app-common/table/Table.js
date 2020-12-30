import React from "react";
import PropTypes from "prop-types";
import "./table.scss";

const Table = ({ header, body }) => {
  return (
    <div className="table-container">
      <table>
        { header && header.length > 0 && (
          <thead>
            <tr>
              { header.map(item => <th key={item}>{item}</th>) }
            </tr>
          </thead>
        )}
        { body && body.length > 0 && (
          <tbody>
            { body.map(({ rowId, row }) => (
              <tr key={rowId}>
                { row.map(({ id, item }) => <td key={id}>{item}</td>) }
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

Table.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string.isRequired),
  body: PropTypes.arrayOf(
    PropTypes.shape({
      rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      row: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          item: PropTypes.node,
        })
      ),
    }),
  ),
};

export default Table;
