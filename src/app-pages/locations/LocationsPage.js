import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MapDetailsContent from "../../app-common/map-details-container/MapDetailsContent";
import { connect } from "redux-bundler-react";
import "./location-page.scss";

const LocationPage = ( { locationDetailData, locationDetailCode, locationDetailIsLoading } ) => {
  useEffect( () => {
    //get location detail of location code in params
  }, [] );
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
}

export default connect(
  "selectLocationDetailData",
  "selectLocationDetailCode",
  "selectLocationDetailIsLoading",
  LocationPage,
);
