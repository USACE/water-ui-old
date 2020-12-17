import React, { useRef, useEffect } from "react";
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
    doLocationDetailFetch,
    doLocationLevelFetch,
    doLocationChildrenFetch,
  } = props;

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const display = displayTypes[queryObject.display] ? queryObject.display : defaultMapParams.display;
  const locationId = queryObject.locationId || "";

  useEffect(() => {
    // We want to always call doLocationDetailFetch, even if the locationId is null, so that the
    // previous location detail data will be cleared if the locationId becomes null. However the
    // other api calls do not need to be called if locationId is null, since their data will not be
    // displayed if locationId is null, so we do not need to worry about clearing their data.
    doLocationDetailFetch();
    if (locationId) {
      doLocationLevelFetch();
      doLocationChildrenFetch();
    }
  }, [locationId, doLocationDetailFetch, doLocationLevelFetch, doLocationChildrenFetch])


  // do not display map details if locationId does not exist and the user is not in full screen mode
  if (!locationId && display !== displayTypes.fs) {
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
  // locationSummariesData is initially an array before it gets reformatted into an object where the key is the location id
  locationSummariesData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  locationDetailIsLoading: PropTypes.bool.isRequired,
  locationDetailData: PropTypes.object,
  doUpdateQuery: PropTypes.func.isRequired,
  doLocationDetailFetch: PropTypes.func.isRequired,
  doLocationLevelFetch: PropTypes.func.isRequired,
  doLocationChildrenFetch: PropTypes.func.isRequired,
};

export default connect(
  "selectQueryObject",
  "selectLocationSummariesData",
  "selectLocationDetailIsLoading",
  "selectLocationDetailData",
  "doUpdateQuery",
  "doLocationDetailFetch",
  "doLocationLevelFetch",
  "doLocationChildrenFetch",
  MapDetailsContainer
);
