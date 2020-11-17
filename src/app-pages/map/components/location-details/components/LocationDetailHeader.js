import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import LocationStreamControls from "./location-stream-controls/LocationStreamControls"

const LocationDetailHeader = ( props ) => {
  const {
    onExpand,
    /** @type a2w.models.LocationDetail */
    locationDetail,
    getHeaderHeight
  } = props;

  const headerHeight = useRef( null );
  const weatherUrl = `https://forecast.weather.gov/MapClick.php?CityName=${locationDetail.nearest_city}&state=${locationDetail.state}`;

  const onExpandHandler = (event) => {
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
        {locationDetail.office_name}
        <span style={{ "padding": "0px 5px" }}>|</span>
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
  getHeaderHeight: PropTypes.func,
};
