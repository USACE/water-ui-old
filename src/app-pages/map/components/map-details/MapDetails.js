import React from "react";
import PropTypes from "prop-types";
import { sourceTypes, displayTypes, defaultMapParams } from "../../map-utils";
import { useDimensions } from "../../../../utils";
import MapAccordion from "./components/map-accordion/MapAccordion";

const MapDetails = ({
  queryObject,
  locationSummariesData,
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

  // display error message if id does not exist and user is in full screen mode; this scenario is
  // only possible if the user manually deletes the id param from the url, but it's good to have a check regardless
  if (!queryObject.id && display === displayTypes.fs) {
    content = "No location is selected.";
  }
  // display error message if location source is not valid
  else if ((!queryObject.source || !sourceTypes[queryObject.source]) && display === displayTypes.fs) {
    content = "Invalid location source."
  }
  // do not display any information if the location summaries have not been loaded
  else if (!locationSummariesHasLoaded) {
    content = "";
  }
  // check in case user puts invalid value for the id in the url
  else if (!locationSummariesData[queryObject.id]) {
    content = <p>The location <strong>{queryObject.id}</strong> does not exist.</p>;
  }
  else {
    content = (
      <MapAccordion
        queryObject={queryObject}
        locationSummariesData={locationSummariesData}
        headerHeight={headerHeight}
        display={display}
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
    id: PropTypes.string,
    source: PropTypes.string,
  }).isRequired,
  locationSummariesData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  locationSummariesHasLoaded: PropTypes.bool,
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  headerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default MapDetails;
