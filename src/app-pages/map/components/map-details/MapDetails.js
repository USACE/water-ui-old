import React from "react";
import PropTypes from "prop-types";
import Accordion from "../../../../app-common/accordion/Accordion";
import { buildLocationDetailSections } from "./data";
import { displayTypes, defaultMapParams } from "../../map-utils";
import { useDimensions } from "../../../../utils";

const MapDetails = ({
  queryObject,
  locationSummariesData,
  locationDetailData,
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
  // check if locationDetailData is empty
  else if (!locationDetailData || Object.keys(locationDetailData).length === 0) {
    content = "There is no data for this location.";
  }
  else {
    const detailSections = buildLocationDetailSections(locationDetailData);
    const navbarPadding = 32;
    const ulStyle = {
      top: headerHeight + navbarPadding,
    };
  
    // scroll to the top of the selected accordion section
    const handleNavlink = (e) => {
      const index = e.target.value;
      const accordionBtnId = detailSections[index].id;
      const accordionBtn = document.getElementById(accordionBtnId);
      const mainHeader = document.getElementById("main-nav");
      const top = accordionBtn.offsetTop + mainHeader.clientHeight - headerHeight - navbarPadding;
      window.scroll({
        top,
        behavior: "smooth",
      });
    };

    content = (
      <>
        { display === displayTypes.fs && (
          <div className="map-details-nav">
            <ul
              className="navbar-ul fixed-sticky-nav"
              style={ulStyle}
            >
              { detailSections.map( ({ title }, index) => (
                  <li
                    key={title}
                    className="nav-item"
                  >
                    <button
                      className="nav-link-btn"
                      value={index}
                      onClick={handleNavlink}
                    >
                      {title}
                    </button>
                  </li>
                ))
              }
            </ul>
          </div>
        )}
        <div className="accordion-container">
          <Accordion
            data={detailSections}
          />
        </div>
      </>
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
  locationDetailData: PropTypes.object,
  locationSummariesHasLoaded: PropTypes.bool,
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  headerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default MapDetails;
