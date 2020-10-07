import React from "react";
import PropTypes from 'prop-types';
import "./location-detail.css";

const LocationDetailHeader = ( { onExpand } ) => {

  // Temporary until we add the rest bundle to load location detail
  const locationDetail = {
    office_id: "MVP",
    office_name: "St. Paul District",
    public_name: "Mississippi R Lock and Dam 03",
    long_name: "Mississippi River Lock and Dam 03",
    location_code: "4572016",
    location_id: "LockDam_03",
    location_kind_id: "PROJECT",
    latitude: 44.61,
    longitude: -92.61,
    elevation: 600,
    unit_id: "ft",
    time_zone_name: "US/Central",
    county_name: "Goodhue",
    state: "MN",
    nearest_city: "Red Wing"
  };

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
  onExpand: () => null
}

LocationDetailHeader.propTypes = {
  onExpand: PropTypes.func
}
