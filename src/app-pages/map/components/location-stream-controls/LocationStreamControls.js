import React,{ useEffect } from "react";
import "./locationStreamControls.scss";
import { connect } from "redux-bundler-react";
import PropTypes from "prop-types";
import { RoutePaths } from "../../../../app-bundles/route-paths";

const LocationStreamControls = ({ locationDetailData, fullScreen, doLocationsMapSaveMapState, doSelectStreamLocation, streamLocations }) => {
  const options = streamLocations && streamLocations.data ? streamLocations.data : [];

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

  // Don't show stream controls if there were no stream locations found
  if( options.length === 0 ) return <></>

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
          value={options[ streamLocations.current_index ] ? options[ streamLocations.current_index ].location_code : ""}
        >
          {options &&
            options.map((item, i) => (
              <option key={i} value={item.location_code}>
                {item.public_name}
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
