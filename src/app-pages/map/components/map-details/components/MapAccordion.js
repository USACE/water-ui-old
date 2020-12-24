import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Accordion from "../../../../../app-common/accordion/Accordion";
import { displayTypes } from "../../../map-utils";
import DamProfile from "./DamProfile";
import LocationInfo from "./LocationInfo";
import LocationChildren from "./LocationChildren";
import TimeSeriesSection from "./time-series/TimeSeriesSection";
import TimeLineSection from "./TimeLineSection";

const MapAccordion = ({
  headerHeight,
  display,
  cwmsDetailData,
  locationChildrenData,
}) => {
  // create the accordion data
  const accordionData = [];
  if (cwmsDetailData.dam_indicator === "T") {
    accordionData.push({
      id: "dam-profile",
      title: "Dam Profile",
      content: <DamProfile />,
      iconClass: "mdi mdi-water-pump",
    });
  }
  accordionData.push({
    id: "location-information",
    title: "Location Information",
    content: <LocationInfo />,
    iconClass: "mdi mdi-map-marker",
  });
  if (locationChildrenData && locationChildrenData.length > 0) {
    accordionData.push({
      id: "location-children",
      title: "Location Children",
      content: <LocationChildren />,
      iconClass: "mdi mdi-map-marker-radius",
    });
  }
  accordionData.push({
    id: "time-series",
    title: "Time Series",
    content: <TimeSeriesSection/>,
    iconClass: "mdi mdi-chart-line",
  }, {
    id: "time-line",
    title: "Time Line",
    content: <TimeLineSection/>,
    iconClass: "mdi mdi-chart-timeline",
  });

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
  locationChildrenData: PropTypes.array,
};

export default connect(
  "selectLocationChildrenData",
  MapAccordion,
);
