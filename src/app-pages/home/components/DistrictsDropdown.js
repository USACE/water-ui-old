import React from "react";
import PropTypes from "prop-types"
import { connect } from "redux-bundler-react";
import Dropdown from "../../../app-common/inputs/Dropdown";

const DistrictsDropdown = ({
  districts,
  selectedDistrict,
  doSetSelectedDistrict,
  doUpdateDistrictBasinMapQuery,
  preventUrlUpdate
}) => {
  
  const onChange = (e) => {
    doSetSelectedDistrict(e.target.value);
    doUpdateDistrictBasinMapQuery( preventUrlUpdate );
  };

  const onReset = () => {
    doSetSelectedDistrict( "" );
    doUpdateDistrictBasinMapQuery( preventUrlUpdate );
  }

  const options = districts && districts.map(val => ({
    id: val.district_id,
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
      onReset={onReset}
    />
  );
};

DistrictsDropdown.propTypes = {
  selectDistricts: PropTypes.arrayOf(PropTypes.shape({
    district_id: PropTypes.string.isRequired,
    district_name: PropTypes.string.isRequired,
  })),
  selectedDistrict: PropTypes.string,
  doSetSelectedDistrict: PropTypes.func.isRequired,
  preventUrlUpdate: PropTypes.bool
};

export default connect(
  "selectDistricts",
  "selectSelectedDistrict",
  "doSetSelectedDistrict",
  "doUpdateDistrictBasinMapQuery",
  DistrictsDropdown,
);
