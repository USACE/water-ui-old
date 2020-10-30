import React from "react";
import PropTypes from "prop-types"
import { connect } from "redux-bundler-react";
import Dropdown from "../../../app-common/Dropdown";

const DistrictsDropdown = ({
  districts,
  selectedDistrict,
  doSetSelectedDistrict,
}) => {
  
  const onChange = (e) => {
    doSetSelectedDistrict(e.target.value);
  };

  const options = districts && districts.map(val => ({
    id: val.district_office_id,
    value: val.district_name,
  }));

  return (
    <Dropdown
      id="districts-dropdown"
      label="Districts Dropdown"
      placeholder="Select District..."
      value={selectedDistrict}
      options={options}
      onChange={onChange}
    />
  );
};

DistrictsDropdown.propTypes = {
  selectDistricts: PropTypes.array,
  selectedDistrict: PropTypes.string,
  doSetSelectedDistrict: PropTypes.func.isRequired,
};

export default connect(
  "selectDistricts",
  "selectSelectedDistrict",
  "doSetSelectedDistrict",
  DistrictsDropdown,
);
