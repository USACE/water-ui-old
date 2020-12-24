import React, { useEffect } from "react";
import { connect } from "redux-bundler-react";
import PropTypes from "prop-types";
import { defaultMapParams, displayTypes, mapUrlOptions } from "../../../../map-utils";
import "./locationStreamControls.scss";

const LocationStreamControls = ({
  queryObject,
  /** @type a2w.models.CwmsDetail */
  cwmsDetailData,
  locationSummariesData,
  doUpdateQuery,
  /** @type a2w.models.StreamLocation[] */
  streamLocationsData,
  doStreamLocationsFetch,
}) => {

  // fetch new stream locations data whenever the streamLocationsCode changes
  const streamLocationsCode = cwmsDetailData.stream_location_code;
  useEffect(() => {
    doStreamLocationsFetch();
  }, [streamLocationsCode, doStreamLocationsFetch]);

  const changeLocation = (e) => {
    const location = streamLocationsData[e.target.value];
    const locationId = location.location_code;
    const locationData = locationSummariesData[locationId];
    const newQuery = {
      ...queryObject,
      locationId,
      lon: locationData.longitude,
      lat: locationData.latitude,
      zoom: locationData.zoom_depth,
    };
    doUpdateQuery(newQuery, mapUrlOptions);
  };

  if (!streamLocationsData || streamLocationsData.length <= 1 || !cwmsDetailData.location_code) {
    return null;
  }

  const display = displayTypes[queryObject.display] ? queryObject.display : defaultMapParams.display;
  const currentIndex = streamLocationsData.findIndex(item => item.location_code === cwmsDetailData.location_code);
  const currentVal = streamLocationsData[ currentIndex ] || {};

  let justifyContent = "justify-content-between";
  if (currentIndex === 0) {
    justifyContent = "justify-content-end";
  } else if (currentIndex === streamLocationsData.length - 1) {
    justifyContent = "justify-content-start";
  }
  return (
    <div className={`location-stream-container ${justifyContent} ${display}`}>
      { currentIndex > 0 && (
        <button
          type="button"
          className="location-stream-btn upstream"
          value={currentIndex - 1}
          onClick={changeLocation}
        >
          Upstream Station
        </button>
      )}
      {/* TODO: create custom dropdown component for selecting a new location since the select element does not look neat on Safari and Firefox */}
      <select
        className="location-stream-selector"
        onChange={changeLocation}
        value={currentIndex}
        title={ `Stream Location: ${currentVal.public_name} (${currentVal.station} ${currentVal.station_unit})` }
      >
        { streamLocationsData.map((item, i) => (
          <option
            key={item.location_code}
            value={i}
          >
            {item.public_name} ({item.station} {item.station_unit})
          </option>
        ))}
      </select>
      { currentIndex < streamLocationsData.length - 1 && (
        <button
          type="button"
          className="location-stream-btn downstream"
          value={currentIndex + 1}
          onClick={changeLocation}
        >
          Downstream Station
        </button>
      )}
    </div>
  );
};

LocationStreamControls.propTypes = {
  queryObject: PropTypes.object.isRequired,
  cwmsDetailData: PropTypes.object.isRequired,
  locationSummariesData: PropTypes.object.isRequired,
  doUpdateQuery: PropTypes.func.isRequired,
  streamLocationsData: PropTypes.array,
  doStreamLocationsFetch: PropTypes.func.isRequired,
};

export default connect(
  "selectStreamLocationsData",
  "doStreamLocationsFetch",
  LocationStreamControls
);
