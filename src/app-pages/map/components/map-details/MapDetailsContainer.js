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
    cwmsDetailIsLoading,
    /** @type a2w.models.CwmsDetail */
    cwmsDetailData,
    doUpdateQuery,
    doCwmsDetailFetch,
    doCwmsLevelFetch,
    doCwmsChildrenFetch,
  } = props;

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const display = displayTypes[queryObject.display] ? queryObject.display : defaultMapParams.display;
  const id = queryObject.id || "";

  useEffect(() => {
    // We want to always call doCwmsDetailFetch, even if the id is null, so that the
    // previous location detail data will be cleared if the id becomes null. However the
    // other api calls do not need to be called if id is null, since their data will not be
    // displayed if id is null, so we do not need to worry about clearing their data.
    doCwmsDetailFetch();
    if (id) {
      doCwmsLevelFetch();
      doCwmsChildrenFetch();
    }
  }, [id, doCwmsDetailFetch, doCwmsLevelFetch, doCwmsChildrenFetch])


  // do not display map details if id does not exist and the user is not in full screen mode
  if (!id && display !== displayTypes.fs) {
    return null;
  }

  const locationSummariesHasLoaded = locationSummariesData && !Array.isArray(locationSummariesData);
  return (
    <div
      ref={containerRef}
      className={`map-details-container ${display}`}
    >
      { (cwmsDetailIsLoading || !locationSummariesHasLoaded) && <Loader /> }
      <MapDetailsHeader
        queryObject={queryObject}
        cwmsDetailData={cwmsDetailData}
        locationSummariesData={locationSummariesData}
        doUpdateQuery={doUpdateQuery}
        locationSummariesHasLoaded={locationSummariesHasLoaded}
        ref={headerRef}
      />
      <MapDetails
        queryObject={queryObject}
        cwmsDetailData={cwmsDetailData}
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
  cwmsDetailIsLoading: PropTypes.bool.isRequired,
  cwmsDetailData: PropTypes.object,
  doUpdateQuery: PropTypes.func.isRequired,
  doCwmsDetailFetch: PropTypes.func.isRequired,
  doCwmsLevelFetch: PropTypes.func.isRequired,
  doCwmsChildrenFetch: PropTypes.func.isRequired,
};

export default connect(
  "selectQueryObject",
  "selectLocationSummariesData",
  "selectCwmsDetailIsLoading",
  "selectCwmsDetailData",
  "doUpdateQuery",
  "doCwmsDetailFetch",
  "doCwmsLevelFetch",
  "doCwmsChildrenFetch",
  MapDetailsContainer
);
