import React from "react";
import PropTypes from "prop-types";

/** @type React.CSSProperties */
const clearButtonCss = {
  float: "right",
  fontSize: "1.4em",
  marginRight: "1.5rem",
  marginTop: "-1.4em",
  cursor: "pointer",
  color: "#333333"
}


const Dropdown = ({
  id,
  label,
  placeholder,
  value,
  options,
  onChange,
  onReset
}) => {
  let selectStyle = {};
  if( onReset && value ) selectStyle = { paddingRight: "1.5rem" };

  return (
  <div className="dropdown-container form-group">
    <select
      className="form-control"
      style={selectStyle}
      id={ id }
      aria-labelledby={ label }
      value={ value || "" }
      onChange={ onChange }>
      { !value && <option value="">{ placeholder }</option> }
      { options && options.map( ( item ) => (
        <option
          key={ item.id }
          value={ item.id !== null ? item.id : item } title={ item.title || "" }>{ item.value !== null ? item.value : item }</option>
      ) ) }
    </select>
    { onReset && value ?
      <button type="button" className="close" style={clearButtonCss} aria-label="Close" onClick={onReset} title="Reset">
        <span aria-hidden="true">&times;</span>
      </button>
      : "" }
  </div>
)};

Dropdown.propTypes = {
  id: PropTypes.any,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.arrayOf( PropTypes.shape({
    id: PropTypes.any,
    value: PropTypes.any,
    title: PropTypes.string
  }) ),
  onChange: PropTypes.func,
  onReset: PropTypes.func,
};

Dropdown.defaultProps = {
  onChange: () => {},
};

export default Dropdown;
