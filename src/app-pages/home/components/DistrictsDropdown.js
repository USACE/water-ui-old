import React from "react";
import PropTypes from "prop-types"
import { connect } from "redux-bundler-react";
import Dropdown from "../../../app-common/inputs/Dropdown";

const DistrictsDropdown = ({
  districts,
  selectedDistrict,
  doUpdateDistrictBasinMapQuery,
  preventUrlUpdate
}) => {
  
  const onChange = (e) => {
    doUpdateDistrictBasinMapQuery( { preventUrlUpdate, districtId: e.target.value, basinId: "" } );
  };

  const onReset = () => {
    doUpdateDistrictBasinMapQuery( { preventUrlUpdate, districtId: "", basinId: "" } );
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
  doUpdateDistrictBasinMapQuery: PropTypes.func.isRequired,
  preventUrlUpdate: PropTypes.bool
};

export default connect(
  "selectDistricts",
  "selectSelectedDistrict",
  "doUpdateDistrictBasinMapQuery",
  DistrictsDropdown,
);
