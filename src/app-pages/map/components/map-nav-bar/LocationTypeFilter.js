import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Dropdown from "../../../../app-common/inputs/Dropdown";

const LocationTypeFilter = ({ doLocationsMapSaveMapState, setTypeFilter }) => {
  const filterType = (e) => {
    const mapState = {
      typeFilter: e.target.value.toUpperCase()
    };
    setTypeFilter( e.target.value.toUpperCase() );
    doLocationsMapSaveMapState( mapState );
  };

  return (
    <Dropdown
      id="location-type-dropdown"
      label="Location Type"
      placeholder="Select Location Type..."
      options={[
        { id: "All", value: "All" },
        { id: "Location", value: "Locations" },
        { id: "Stream_Location", value: "Stream Gages" },
        // { id: "Stream", value: "Streams" },
        // { id: "Project", value: "Projects" },
        // { id: "Turbine", value: "Turbines" },
        // { id: "Outlet", value: "Outlets" },
        // { id: "Lock", value: "Locks" },
        // { id: "Embankment", value: "Embankments" },
        { id: "WQ", value: "WQ" },
        { id: "Basin", value: "Basins" },
        { id: "Operating_Basin", value: "Operating Basins" },
        
      ]}
      onChange={e=> filterType(e)}
    />
  );
};

LocationTypeFilter.propTypes = {
  doLocationsMapSaveMapState: PropTypes.func.isRequired,
  setTypeFilter: PropTypes.func.isRequired,
};

export default connect(
  "doLocationsMapSaveMapState",
  LocationTypeFilter
);
