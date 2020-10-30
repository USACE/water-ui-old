import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./location-detail.scss";
import LocationStreamControls from "../../app-pages/map/components/location-stream-controls/LocationStreamControls";
const LocationDetailHeader = ({ onExpand, locationDetail, getHeaderHeight }) => {
  const headerHeight = useRef( null );
  const weatherUrl = `https://forecast.weather.gov/MapClick.php?CityName=${locationDetail.nearest_city}&state=${locationDetail.state}`;

  const onExpandHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onExpand();
  };

  const locationHeaderSticky = !onExpand ? "fixed-sticky" : "";

  useEffect(() => {
    getHeaderHeight(headerHeight.current.clientHeight);
  }, [ getHeaderHeight ]);

  return (
    <div className={`location-detail-header ${locationHeaderSticky}`} ref={headerHeight}>
      {onExpand && (
        <div className="mdi mdi-arrow-expand location-expand" title="Expand Detail View" onClick={onExpandHandler} />
      )}
      <h4>{locationDetail.public_name}</h4>
      <div className="location-detail-subheading">
        {locationDetail.office_name} |
        <a href={weatherUrl} target="_blank" rel="noopener noreferrer">
          Local Forecast
        </a>
      </div>
      <LocationStreamControls fullScreen={onExpand} />
    </div>
  );
};

export default LocationDetailHeader;

LocationDetailHeader.defaultProps = {
  onExpand: () => null,
  locationDetail: {},
};

LocationDetailHeader.propTypes = {
  onExpand: PropTypes.func,
  locationDetail: PropTypes.object,
};
