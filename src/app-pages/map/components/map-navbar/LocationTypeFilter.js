import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Dropdown from "../../../../app-common/inputs/Dropdown";
import { locationTypes, mapUrlOptions } from "../../map-utils";

const LocationTypeFilter = ({ queryObject, doUpdateQuery }) => {
  const onChange = (e) => {
    const locationType = e.target.value;
    const newQuery = {
      ...queryObject,
      locationType,
    };
    doUpdateQuery(newQuery, mapUrlOptions);
  };

  const onReset = () => {
    const newQuery = {
      ...queryObject,
      locationType: locationTypes.ALL
    };
    doUpdateQuery(newQuery, mapUrlOptions);
  };

  return (
    <Dropdown
      id="location-type-dropdown"
      label="Location Type"
      placeholder="Select Location Type..."
      value={queryObject.locationType || locationTypes.ALL}
      options={[
        { id: locationTypes.ALL, value: "All Locations" },
        { id: locationTypes.LOCATION, value: "Locations" },
        { id: locationTypes.STREAM_LOCATION, value: "Stream Gages" },
        // { id: locationTypes.STREAM, value: "Streams" },
        // { id: locationTypes.PROJECT, value: "Projects" },
        // { id: locationTypes.TURBINE, value: "Turbines" },
        // { id: locationTypes.OUTLET, value: "Outlets" },
        // { id: locationTypes.LOCK, value: "Locks" },
        // { id: locationTypes.EMBANKMENT, value: "Embankments" },
        { id: locationTypes.WQ, value: "WQ" },
        { id: locationTypes.BASIN, value: "Basins" },
        { id: locationTypes.OPERATING_BASIN, value: "Operating Basins" },
        { id: locationTypes.DAMS, value: "Dams" },
        { id: locationTypes.LAKES, value: "Lakes" },
      ]}
      onChange={onChange}
      onReset={ ( queryObject.locationType && queryObject.locationType !== locationTypes.ALL && onReset ) }
    />
  );
};

LocationTypeFilter.propTypes = {
  queryObject: PropTypes.shape({
    locationType: PropTypes.string,
  }).isRequired,
  doUpdateQuery: PropTypes.func.isRequired,
};

export default connect(
  "selectQueryObject",
  "doUpdateQuery",
  LocationTypeFilter,
);
