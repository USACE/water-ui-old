import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";

const defaultOnChange = (e, doUpdateUrl) => {
  //just routing to map page for now
  //will pass in onChange prop later to make function more reusable and push selection to redux
  doUpdateUrl("/map");
};
//replace with custom dd with lis if we need custom design or tabbing
const DropDown = (props) => {
  const { label, id, options, doUpdateUrl, placeHolder, onChange, optName,optId} = props;
  return (
    <div className="dropdown-container form-group">
      <select
        className="form-control"
        id={id}
        aria-labelledby={label}
        onChange={(e) => onChange(e)}
      >
        <option>{placeHolder}</option>
        {
        options.map((item, i) => (
          <option key={i} value={item[optId]}>{item[optName]}</option>
        ))}
      </select>
    </div>
  );
};

DropDown.propTypes = {
  title: PropTypes.string,
};

DropDown.defaultProps = {
  onChange: defaultOnChange,
  placeHolder: "Select"
};

export default connect("doUpdateUrl",DropDown);
