import React from "react";
import LocationDetailHeader from "../location-detail/Header";
import Accordion from "../accordion/Accordion";
import { accordionArrObjs } from "./data";
import "./map-details-content.scss";

const MapDetailsContent = ({ handleFullScreen, locationDetail, locationCode }) => {

  const formatId = (title)=> {
    return title && title.toLowerCase().replace(" ","_");
  };

  const handleNavClick = (title) => {
   const accordionBtnId = formatId(title);
   document.getElementById(accordionBtnId).scrollIntoView({
    behavior: 'smooth'});
  };

  return (
    <main>
      <LocationDetailHeader
        locationDetail={locationDetail}
        onExpand={handleFullScreen ? () => handleFullScreen(locationCode) : null}
      ></LocationDetailHeader>
      <div className="location-detail-content-container row pt-4">
        {!handleFullScreen && (
          <div className="map-details-nav col-md-2 pr-0">
            <ul className="navbar-ul">
              {accordionArrObjs &&
                accordionArrObjs.map( (section,i) => {
                  const { title } = section
                  return (
                    <li className="nav-item" key={i}>
                      <button className="nav-link-btn" 
                      onClick = {()=>handleNavClick(title)}
                      >
                        { title }
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
        <div className={!handleFullScreen ? " pl-0 pr-5 col-md-10" : ""}>
          <Accordion data={accordionArrObjs} formatId={formatId}/>
        </div>
      </div>
    </main>
  );
};

export default MapDetailsContent;
