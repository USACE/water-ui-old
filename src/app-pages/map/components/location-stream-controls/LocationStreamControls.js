import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import PropTypes from "prop-types";
import { RoutePaths } from "../../../../app-bundles/route-paths";
import "./locationStreamControls.scss";

const LocationStreamControls = ({
  fullScreen,
  locationDetailData,
  streamLocationsData,
  doLocationsMapSaveMapState,
  doStreamLocationsFetch,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // fetch new stream locations data and reset the current index whenver the locationsDetailData changes
    doStreamLocationsFetch();
    setCurrentIndex(0);
  }, [locationDetailData, doStreamLocationsFetch, setCurrentIndex])

  const changeStation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const jumpStation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(e.target.value);
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
      { streamLocationsData && streamLocationsData.length > 0 && (
        <div className="location-stream-controls-wrapper">
          <button className="link downstream-station" onClick={changeStation}>
            downstream station
          </button>
          <select
            className="jump-station"
            aria-labelledby="jump to station dropdown"
            onChange={jumpStation}
            onClick={jumpStation}
            value={currentIndex}
          >
            { streamLocationsData.map((item, i) => (
                <option
                  key={item.location_code}
                  value={i}
                >
                  {item.public_name}
                </option>
              ))
            }
          </select>
          <button className="link upstream-station" onClick={changeStation}>
            upstream station
          </button>
        </div>
      )}
    </div>
  );
};

LocationStreamControls.propTypes = {
  locationDetailData: PropTypes.object,
  fullScreen: PropTypes.func,
};

export default connect(
  "selectLocationDetailData",
  "selectStreamLocationsData",
  "doLocationsMapSaveMapState",
  "doStreamLocationsFetch",
  LocationStreamControls
);
