import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Accordion from "../../../../../../app-common/accordion/Accordion";
import { sourceTypes, displayTypes } from "../../../../map-utils";
import {
  getCwmsAccordionData,
  getWqAccordionData,
} from "./map-accordion-utils";

const MapAccordion = ({
  queryObject,
  headerHeight,
  display,
  cwmsDetailData,
  cwmsChildrenData,
}) => {
  // set the accordion data according to the source type
  let accordionData = [];
  switch (queryObject.source) {
    case sourceTypes.CWMS:
      accordionData = getCwmsAccordionData(cwmsDetailData, cwmsChildrenData);
      break;
    case sourceTypes.WQ:
      accordionData = getWqAccordionData();
      break;
    default:
      accordionData = [];
  }

  const navbarPadding = 32;
  const ulStyle = {
    top: headerHeight + navbarPadding,
  };

  // scroll to the top of the selected accordion section
  const handleNavlink = (e) => {
    const index = e.target.value;
    const accordionBtnId = accordionData[index].id;
    const accordionBtn = document.getElementById(accordionBtnId);
    const mainHeader = document.getElementById("main-nav");
    const top = accordionBtn.offsetTop + mainHeader.clientHeight - headerHeight - navbarPadding;
    window.scroll({
      top,
      behavior: "smooth",
    });
  };

  if (accordionData.length === 0) {
    return "No data for this location.";
  }
  return (
    <>
      { display === displayTypes.fs && (
        <div className="map-details-nav">
          <ul
            className="navbar-ul fixed-sticky-nav"
            style={ulStyle}
          >
            { accordionData.map( ({ title }, index) => (
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
          data={accordionData}
        />
      </div>
    </>
  );
};

MapAccordion.propTypes = {
  queryObject: PropTypes.shape({
    source: PropTypes.string.isRequired,
  }).isRequired,
  cwmsDetailData: PropTypes.object,
  cwmsChildrenData: PropTypes.array,
};

export default connect(
  "selectCwmsDetailData",
  "selectCwmsChildrenData",
  MapAccordion,
);
