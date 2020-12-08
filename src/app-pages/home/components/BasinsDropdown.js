import React from "react";
import PropTypes from "prop-types"
import { connect } from "redux-bundler-react";
import Dropdown from "../../../app-common/inputs/Dropdown";

const BasinsDropdown = ( props ) => {
  const {
    /** @type a2w.models.DistrictBasin[] */
    basins,
    selectedBasin,
    selectedDistrict,
    doSetSelectedBasin,
    doUpdateDistrictBasinMapQuery
  } = props;
  
  const onChange = (e) => {
    let basinId = e.target.value;
    doSetSelectedBasin(e.target.value);
    if( basinId ) doUpdateDistrictBasinMapQuery();
  };

  const onReset = () => {
    doSetSelectedBasin( "" );
    doUpdateDistrictBasinMapQuery();
  }

  const options = basins && basins.map(val => ({
    id: val.basin_id,
    value: `${ val.basin_name } (${ val.district_office_id })`,
    title: `${ val.basin_name } (${ val.district_name })`
  }));
  if( selectedDistrict && options.length > 0 ) options.unshift( { id: "all", value: "Any Basin in District" } );

  return (
    <Dropdown
      id="basins-dropdown"
      label="Basin Dropdown"
      placeholder="Select Basin..."
      value={selectedBasin}
      options={options}
      onChange={onChange}
      onReset={onReset}
    />
  );
};

BasinsDropdown.propTypes = {
  basins: PropTypes.arrayOf(PropTypes.shape({
    basin_name: PropTypes.string.isRequired,
    basin_id: PropTypes.string.isRequired,
  })),
  doSetSelectedBasin: PropTypes.func.isRequired,
  doUpdateDistrictBasinMapQuery: PropTypes.func.isRequired,
};

export default connect(
  "selectBasins",
  "selectSelectedBasin",
  "selectSelectedDistrict",
  "doSetSelectedBasin",
  "doUpdateDistrictBasinMapQuery",
  BasinsDropdown,
);
