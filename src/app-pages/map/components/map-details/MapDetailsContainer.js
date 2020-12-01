import React, { useRef } from "react";
import { connect } from "redux-bundler-react";
import PropTypes from "prop-types";
import Loader from "../../../../app-common/loader/Loader";
import MapDetailsHeader from "./MapDetailsHeader";
import MapDetails from "./MapDetails";
import { displayTypes, defaultMapParams } from "../../map-utils";
import "./mapDetails.scss";

// renders a collapsible side panel containing the selected location's data
const MapDetailsContainer = ( props ) => {
  const {
    queryObject,
    locationSummariesData,
    locationDetailIsLoading,
    /** @type a2w.models.LocationDetail */
    locationDetailData,
    doUpdateQuery,
  } = props;

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const display = displayTypes[queryObject.display] ? queryObject.display : defaultMapParams.display;

  // do not display map details if locationId does not exist and the user is not in full screen mode
  if (!queryObject.locationId && display !== displayTypes.fs) {
    return null;
  }

  const locationSummariesHasLoaded = locationSummariesData && !Array.isArray(locationSummariesData);
  return (
    <div
      ref={containerRef}
      className={`map-details-container ${display}`}
    >
      { (locationDetailIsLoading || !locationSummariesHasLoaded) && <Loader /> }
      <MapDetailsHeader
        queryObject={queryObject}
        locationDetailData={locationDetailData}
        locationSummariesData={locationSummariesData}
        doUpdateQuery={doUpdateQuery}
        locationSummariesHasLoaded={locationSummariesHasLoaded}
        ref={headerRef}
      />
      <MapDetails
        queryObject={queryObject}
        locationDetailData={locationDetailData}
        locationSummariesData={locationSummariesData}
        locationSummariesHasLoaded={locationSummariesHasLoaded}
        containerRef={containerRef}
        headerRef={headerRef}
      />
    </div>
  );
};

MapDetailsContainer.propTypes = {
  queryObject: PropTypes.object.isRequired,
  // locationSummariesData is initially an array before it gets reformated into an object where the key is the location id
  locationSummariesData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  locationDetailIsLoading: PropTypes.bool.isRequired,
  locationDetailData: PropTypes.object,
  doUpdateQuery: PropTypes.func.isRequired,
};

export default connect(
  "selectQueryObject",
  "selectLocationSummariesData",
  "selectLocationDetailIsLoading",
  "selectLocationDetailData",
  "doUpdateQuery",
  MapDetailsContainer
);
