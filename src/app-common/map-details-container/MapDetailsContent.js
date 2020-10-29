import React from "react";
import LocationDetailHeader from "../location-detail/Header";
import Accordion from "../accordion/Accordion";
import { accordionArrObjs } from "./data";
import "./map-details-content.scss";
import PropTypes from "prop-types";

const MapDetailsContent = ({ handleFullScreen, locationDetail, locationCode }) => {
  const formatId = (title) => {
    return title && title.toLowerCase().replace(" ", "_");
  };

  const handleNavClick = (title) => {
    const accordionBtnId = formatId(title);

    // TODO: Try to get header height via ref instead of hard coding it to 175?
    const topOfElement = document.getElementById(accordionBtnId).offsetTop - 175;
    window.scroll({ top: topOfElement, behavior: "smooth" });
  };

  return (
    <main>
      <LocationDetailHeader
        locationDetail={locationDetail}
        onExpand={handleFullScreen ? () => handleFullScreen({selectedLocationCode:locationCode}) : null}
      ></LocationDetailHeader>
      <div className="location-detail-content-container">
        {!handleFullScreen && (
          <div className="map-details-nav">
            <ul className="navbar-ul fixed-sticky-nav">
              {accordionArrObjs &&
                accordionArrObjs.map((section, i) => {
                  const { title } = section;
                  return (
                    <li className="nav-item" key={i}>
                      <button className="nav-link-btn" onClick={() => handleNavClick(title)}>
                        {title}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
        <div className="accordion-container">
          <Accordion data={accordionArrObjs} formatId={formatId} />
        </div>
      </div>
    </main>
  );
};

MapDetailsContent.propTypes = {
  handleFullScreen: PropTypes.func, 
  locationDetail: PropTypes.object,
  locationCode: PropTypes.string
};


export default MapDetailsContent;
