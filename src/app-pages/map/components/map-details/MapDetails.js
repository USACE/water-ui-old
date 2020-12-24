import React from "react";
import PropTypes from "prop-types";
import { displayTypes, defaultMapParams } from "../../map-utils";
import { useDimensions } from "../../../../utils";
import MapAccordion from "./components/MapAccordion";

const MapDetails = ({
  queryObject,
  locationSummariesData,
  cwmsDetailData,
  locationSummariesHasLoaded,
  containerRef,
  headerRef,
}) => {
  const display = queryObject.display || defaultMapParams.display;
  const containerHeight = containerRef.current ? containerRef.current.clientHeight : 0;
  const [headerHeight] = useDimensions(headerRef);
  const detailsHeight = containerHeight - headerHeight;

  const style = {};
  if (display === displayTypes.opened) {
    style.height = detailsHeight;
    style.overflow = "scroll";
  }

  let content = null;

  // display error message if locationId does not exist and user is in full screen mode; this scenario is
  // only possible if the user manually deletes the locationId param from the url, but it's good to have a check regardless
  if (!queryObject.locationId && display === displayTypes.fs) {
    content = "No location is selected.";
  }
  // do not display any information if the location summaries have not been loaded
  else if (!locationSummariesHasLoaded) {
    content = "";
  }
  // check in case user puts invalid value for the locationId in the url
  else if (!locationSummariesData[queryObject.locationId]) {
    content = <p>The location <strong>{queryObject.locationId}</strong> does not exist.</p>;
  }
  // check if cwmsDetailData is empty
  else if (!cwmsDetailData || Object.keys(cwmsDetailData).length === 0) {
    content = "There is no data for this location.";
  }
  else {
    content = (
      <MapAccordion
        headerHeight={headerHeight}
        display={display}
        cwmsDetailData={cwmsDetailData}
      />
    );
  }
  return (
    <div
      className={`map-details-content ${display}`}
      style={style}
    >
      {content}
    </div>
  );
};

MapDetails.propTypes = {
  queryObject: PropTypes.shape({
    locationId: PropTypes.string.isRequired,
  }).isRequired,
  locationSummariesData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  cwmsDetailData: PropTypes.object,
  locationSummariesHasLoaded: PropTypes.bool,
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  headerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default MapDetails;
