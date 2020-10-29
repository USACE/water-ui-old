import React from "react";
import "./locationStreamControls.scss";
import { connect } from "redux-bundler-react";
import PropTypes from "prop-types";

const LocationStreamControls = ({ selectedLocationDetail, fullScreen }) => {
  // For now, mock this array. Later, we'll add a mock array of stream locations to the location data.
  const options = ["jump to station", "station 1", "station 2", "station 3"];

  const changeStation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const jumpStation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const fullScreenContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div className="location-stream-control-container" style={!fullScreen ? fullScreenContainerStyle : null}>
      {!fullScreen && (
        <div className="back-to-map-link">
          <a href="/map">Back to Map</a>
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
  selectedLocationDetail: PropTypes.object,
};

export default connect("selectSelectedLocationDetail", LocationStreamControls);
