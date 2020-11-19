import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import Dropdown from "../../../app-common/inputs/Dropdown";
import { connect } from "redux-bundler-react";


const LocationTypeFilter = ({ doLocationsMapSaveMapState, setTypeFilter}) => {

const filterType = ( e ) =>{
    const mapState = {
      typeFilter: e.target.value.toUpperCase()
    };
    setTypeFilter( e.target.value.toUpperCase() );
    doLocationsMapSaveMapState( mapState );
};

  return (
    <Fragment >
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
            onChange={(e)=> filterType(e)}
            />

    </Fragment>
  );
};
LocationTypeFilter.propTypes = {
  doLocationsMapSaveMapState: PropTypes.func.isRequired,
};

export default connect(
  "doLocationsMapSaveMapState",
  LocationTypeFilter
);
