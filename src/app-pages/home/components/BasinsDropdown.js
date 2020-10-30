import React from "react";
import PropTypes from "prop-types"
import { connect } from "redux-bundler-react";
import Dropdown from "../../../app-common/Dropdown";
import { RoutePaths } from "../../../app-bundles/routes-bundle";

const BasinsDropdown = ({
  basinsForDistrict,
  doSetSelectedBasin,
  doUpdateUrl,
}) => {
  
  const onChange = (e) => {
    doSetSelectedBasin(e.target.value);
    doUpdateUrl(RoutePaths.Map);
  };

  const options = basinsForDistrict && basinsForDistrict.map(val => ({
    id: val.basin_location_id,
    value: val.basin_name,
  }));

  return (
    <Dropdown
      id="basins-dropdown"
      label="Basin Dropdown"
      placeholder="Select Basin..."
      options={options}
      onChange={onChange}
    />
  );
};

BasinsDropdown.propTypes = {
  basinsForDistrict: PropTypes.array,
  doSetSelectedBasin: PropTypes.func.isRequired,
  doUpdateUrl: PropTypes.func.isRequired,
};

export default connect(
  "selectBasinsForDistrict",
  "doSetSelectedBasin",
  "doUpdateUrl",
  BasinsDropdown,
);
