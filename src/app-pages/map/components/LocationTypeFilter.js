import React, { useEffect,useState, Fragment } from "react";
import PropTypes from 'prop-types';
import Dropdown from "../../../../app-common/Dropdown";
import { connect } from "redux-bundler-react";


const LocationTypeFilter = ({ locationSummaries, doLocationSummariesFormatData, locationsMapMapState,doLocationsMapSaveMapState}) => {
console.log("locationSummaries: ",locationSummaries)
const locationSummariesState = locationSummaries;

const filterType = ( e, locationSummariesState, doLocationSummariesFormatData ) =>{

    const mapState = locationsMapMapState.typeFilter = e.target.value.toUpperCase()
    console.log("in filter", mapState)
    doLocationsMapSaveMapState(mapState)

};
  return (
    <Fragment >
          <Dropdown
            id="location-type-dropdown"
            label="Location Type"
            placeholder="Select Location Type..."
            options={[
              { id: "Divisions", value: "Divisions" },
              { id: "Districts", value: "Districts" },
              { id: "Projects", value: "Projects" },
              { id: "Stream Gages", value: "Stream Gages" },
              { id: "Sites", value: "Sites" },
              { id: "WQ", value: "WQ" },
              { id: "BASIN", value: "BASIN" },
            ]}
            onChange={(e)=> filterType(e,locationSummaries,doLocationSummariesFormatData)}
            />

    </Fragment>
  );
};
LocationTypeFilter.propTypes = {
//   locationDetailData: PropTypes.object,
};

export default connect(
  "doLocationSummariesFormatData",
  "selectLocationSummaries",
  "doLocationsMapSaveMapState",
  "selectLocationsMapMapState",
  LocationTypeFilter
);
