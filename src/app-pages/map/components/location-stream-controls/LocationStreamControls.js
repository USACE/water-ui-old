import React,{ useEffect } from "react";
import "./locationStreamControls.scss";
import { connect } from "redux-bundler-react";
import PropTypes from "prop-types";
import { RoutePaths } from "../../../../app-bundles/route-paths";

const LocationStreamControls = ({ locationDetailData, fullScreen, doLocationsMapSaveMapState, doSelectStreamLocation, streamLocations }) => {
  // For now, mock this array. Later, we'll add a mock array of stream locations to the location data.
  const options = ["jump to station", "station 1", "station 2", "station 3"];
  
  useEffect(() => {
    doSelectStreamLocation( locationDetailData &&  locationDetailData.location_code);
  }, [locationDetailData, doSelectStreamLocation]);

  const changeStation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const jumpStation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const saveMapState = () => {
    const mapState = {
      zoom: locationDetailData.zoom_depth ? Math.round( locationDetailData.zoom_depth * 1.5 ) : 16,
      center: [locationDetailData.longitude, locationDetailData.latitude],
    };
    if( locationDetailData.longitude && locationDetailData.latitude ) doLocationsMapSaveMapState( mapState );
  }

  const fullScreenContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div className="location-stream-control-container" style={!fullScreen ? fullScreenContainerStyle : null}>
      {!fullScreen && (
        <div className="back-to-map-link">
          <a href={RoutePaths.Map} onClick={saveMapState}>Back to Map</a>
        </div>
      )}
      <div className="location-stream-controls-wrapper">
        <button className="link downstream-station" onClick={changeStation}>
          downstream station
        </button>
        <select
          className="jump-station"
          aria-labelledby="jump to station dropdown"
          onChange={jumpStation}
          onClick={jumpStation}
        >
          {options &&
            options.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
        </select>
        <button className="link upstream-station" onClick={changeStation}>
          upstream station
        </button>
      </div>
    </div>
  );
};

LocationStreamControls.propTypes = {
  locationDetailData: PropTypes.object,
  fullScreen: PropTypes.func,
};

export default connect(
  "selectLocationDetailData",
  "doLocationsMapSaveMapState",
  "doSelectStreamLocation",
  "selectStreamLocations",
  LocationStreamControls
);
