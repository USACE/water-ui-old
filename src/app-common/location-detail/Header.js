import React from "react";
import PropTypes from 'prop-types';
import "./location-detail.css";

const LocationDetailHeader = ( { onExpand, locationDetail } ) => {

  const weatherUrl = `https://forecast.weather.gov/MapClick.php?CityName=${ locationDetail.nearest_city }&state=${ locationDetail.state }`

  const onExpandHandler = ( event ) => {
    event.preventDefault();
    event.stopPropagation();
    onExpand();
  }

  return (
    <div className="location-detail-header">
      <div className="mdi mdi-arrow-expand location-expand" title="Expand Detail View" onClick={ onExpandHandler }></div>
      <h4>{ locationDetail.public_name }</h4>
      <div className="location-detail-subheading">
        { locationDetail.office_name } | <a href={ weatherUrl } target="_blank" rel="noopener noreferrer">Local Forecast</a>
      </div>
    </div>
  );
};

export default LocationDetailHeader;

LocationDetailHeader.defaultProps = {
  onExpand: () => null,
  locationDetail: {},
}

LocationDetailHeader.propTypes = {
  onExpand: PropTypes.func,
  locationDetail: PropTypes.object,
}
