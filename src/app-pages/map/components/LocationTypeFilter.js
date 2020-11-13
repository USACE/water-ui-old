import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import Dropdown from "../../../app-common/Dropdown";
import { connect } from "redux-bundler-react";


const LocationTypeFilter = ({ doLocationsMapSaveMapState }) => {


const filterType = ( e ) =>{
    const mapState = {
      typeFilter: e.target.value.toUpperCase()
    };
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
              { id: "Location", value: "Location" },
              // { id: "Stream_Gages", value: "Stream Gages" },
              // { id: "Stream", value: "Stream" },
              { id: "WQ", value: "WQ" },
              { id: "Basin", value: "Basin" },
              { id: "Operating_Basin", value: "Operating Basin" },
              
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
