import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LocationDetails from "../map/components/location-details/LocationDetails";
import { connect } from "redux-bundler-react";
import "./location-page.scss";

const LocationPage = ({
  routeParams,
  locationDetailData,
  locationDetailCode,
  locationDetailIsLoading,
  doLocationDetailSetCode,
}) => {
  useEffect( () => {
    if (locationDetailCode !== routeParams.locationId) {
      doLocationDetailSetCode(routeParams.locationId)
    }
  }, [locationDetailCode, routeParams, doLocationDetailSetCode] );

  return (
    <div className="map-and-details-container">
      <LocationDetails
        locationDetail = { locationDetailData }
        locationCode = { locationDetailCode }
        locationDetailIsLoading={ locationDetailIsLoading }
      />
    </div>
  );
};

LocationPage.propTypes = {
  locationDetailData: PropTypes.object,
  locationDetailCode: PropTypes.string,
  locationDetailIsLoading: PropTypes.bool.isRequired,
  doLocationDetailSetCode: PropTypes.func.isRequired,
}

export default connect(
  "selectRouteParams",
  "selectLocationDetailData",
  "selectLocationDetailCode",
  "selectLocationDetailIsLoading",
  "doLocationDetailSetCode",
  LocationPage,
);
