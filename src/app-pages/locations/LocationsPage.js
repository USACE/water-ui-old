import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MapDetailsContent from "../../app-common/map-details-container/MapDetailsContent";
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
    <main>
      <div className="map-and-details-container">
        <MapDetailsContent
          locationDetail = { locationDetailData }
          locationCode = { locationDetailCode }
          locationDetailIsLoading={ locationDetailIsLoading }
        />
      </div>
    </main>
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
