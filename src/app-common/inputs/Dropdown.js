import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({
  id,
  label,
  placeholder,
  value,
  options,
  onChange
}) => (
  <div className="dropdown-container form-group">
    <select
      className="form-control"
      id={ id }
      aria-labelledby={ label }
      value={ value || "" }
      onChange={ onChange }>
      { !value && <option value="">{ placeholder }</option> }
      { options && options.map( ( item ) => (
        <option
          key={ item.id }
          value={ item.id !== null ? item.id : item }>{ item.value !== null ? item.value : item }</option>
      ) ) }
    </select>
  </div>
);

Dropdown.propTypes = {
  id: PropTypes.any,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.arrayOf( PropTypes.shape({
    id: PropTypes.any,
    value: PropTypes.any,
  }) ),
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  onChange: () => {},
};

export default Dropdown;
