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
    doFetchMapDetailsData,
  } = props;

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const display = displayTypes[queryObject.display] ? queryObject.display : defaultMapParams.display;
  const id = queryObject.id || "";
  const source = queryObject.source || "";

  useEffect(() => {
    doFetchMapDetailsData(id, source);
  }, [id, source, doFetchMapDetailsData]);


  // do not display map details if id or source does not exist and the user is not in full screen mode
  if ((!id || !source) && display !== displayTypes.fs) {
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
  // locationSummariesData is initially an array before it gets reformatted into an object where the key is the id
  locationSummariesData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  cwmsDetailIsLoading: PropTypes.bool.isRequired,
  cwmsDetailData: PropTypes.object,
  doUpdateQuery: PropTypes.func.isRequired,
  doFetchMapDetailsData: PropTypes.func.isRequired,
};

export default connect(
  "selectQueryObject",
  "selectLocationSummariesData",
  "selectCwmsDetailIsLoading",
  "selectCwmsDetailData",
  "doUpdateQuery",
  "doFetchMapDetailsData",
  MapDetailsContainer
);
