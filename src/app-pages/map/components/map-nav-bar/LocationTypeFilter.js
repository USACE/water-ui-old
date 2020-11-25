import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Dropdown from "../../../../app-common/inputs/Dropdown";
import { LOCATION_TYPES, defaultMapParams, getMapUrl } from "../../utils";

const LocationTypeFilter = ({ queryObject, doUpdateUrl }) => {
  const onChange = (e) => {
    const locationType = e.target.value;
    const mapParams = {
      ...defaultMapParams,
      ...queryObject,
      locationType,
    };
    const mapUrl = getMapUrl(mapParams);
    doUpdateUrl(mapUrl)
  };

  return (
    <Dropdown
      id="location-type-dropdown"
      label="Location Type"
      placeholder="Select Location Type..."
      value={queryObject.locationType || LOCATION_TYPES.ALL}
      options={[
        { id: LOCATION_TYPES.ALL, value: "All" },
        { id: LOCATION_TYPES.LOCATION, value: "Locations" },
        { id: LOCATION_TYPES.STREAM_LOCATION, value: "Stream Gages" },
        // { id: LOCATION_TYPES.STREAM, value: "Streams" },
        // { id: LOCATION_TYPES.PROJECT, value: "Projects" },
        // { id: LOCATION_TYPES.TURBINE, value: "Turbines" },
        // { id: LOCATION_TYPES.OUTLET, value: "Outlets" },
        // { id: LOCATION_TYPES.LOCK, value: "Locks" },
        // { id: LOCATION_TYPES.EMBANKMENT, value: "Embankments" },
        { id: LOCATION_TYPES.WQ, value: "WQ" },
        { id: LOCATION_TYPES.BASIN, value: "Basins" },
        { id: LOCATION_TYPES.OPERATING_BASIN, value: "Operating Basins" },
        
      ]}
      onChange={onChange}
    />
  );
};

LocationTypeFilter.propTypes = {
  queryObject: PropTypes.shape({
    locationType: PropTypes.string,
  }).isRequired,
  doUpdateUrl: PropTypes.func.isRequired,
};

export default connect(
  "doLocationsMapSaveMapState",
  LocationTypeFilter
);
