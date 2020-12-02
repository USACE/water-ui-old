import React from "react";
import PropTypes from "prop-types"
import { connect } from "redux-bundler-react";
import Dropdown from "../../../app-common/inputs/Dropdown";
import { RoutePaths } from "../../../app-bundles/route-paths";

const BasinsDropdown = ( props ) => {
  const {
    /** @type a2w.models.DistrictBasin[] */
    basins,
    selectedBasin,
    doSetSelectedBasin,
    doUpdateUrl,
  } = props;
  
  const onChange = (e) => {
    doSetSelectedBasin(e.target.value);
    const selectedBasin = basins.find( item => item.basin_location_id === e.target.value );
    if( selectedBasin ) {
      const url = `${ RoutePaths.Map }?lon=${ selectedBasin.longitude }&lat=${ selectedBasin.latitude }&zoom=8`;
      doUpdateUrl( url );
    }
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
      value={selectedBasin}
      options={options}
      onChange={onChange}
    />
  );
};

BasinsDropdown.propTypes = {
  basins: PropTypes.arrayOf(PropTypes.shape({
    basin_name: PropTypes.string.isRequired,
    basin_location_id: PropTypes.string.isRequired,
  })),
  doSetSelectedBasin: PropTypes.func.isRequired,
  doUpdateUrl: PropTypes.func.isRequired,
};

export default connect(
  "selectBasins",
  "selectSelectedBasin",
  "doSetSelectedBasin",
  "doUpdateUrl",
  BasinsDropdown,
);
