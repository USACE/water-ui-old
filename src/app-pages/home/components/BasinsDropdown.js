import React from "react";
import PropTypes from "prop-types"
import { connect } from "redux-bundler-react";
import Dropdown from "../../../app-common/Dropdown";
import { RoutePaths } from "../../../app-bundles/route-paths";

const BasinsDropdown = ({
  basins,
  doSetSelectedBasin,
  doUpdateUrl,
}) => {
  
  const onChange = (e) => {
    doSetSelectedBasin(e.target.value);
    doUpdateUrl(RoutePaths.Map);
  };

  const options = basins && basins.map(val => ({
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
  basins: PropTypes.arrayOf(PropTypes.shape({
    basin_name: PropTypes.string.isRequired,
    basin_location_id: PropTypes.string.isRequired,
    basin_location_code: PropTypes.string.isRequired,
  })),
  doSetSelectedBasin: PropTypes.func.isRequired,
  doUpdateUrl: PropTypes.func.isRequired,
};

export default connect(
  "selectBasins",
  "doSetSelectedBasin",
  "doUpdateUrl",
  BasinsDropdown,
);
