import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Accordion from "../../../../app-common/accordion/Accordion";
import Loader, { loaderTypes } from "../../../../app-common/loader/Loader";
import LocationDetailHeader from "./components/LocationDetailHeader";
import { accordionArrObjs } from "./data";

const LocationDetails = ({ handleFullScreen, locationDetail, locationCode, locationDetailIsLoading }) => {

  const [headerHeight, setHeaderHeight] = useState(null);
  const formatId = (title) => {
    return title && title.toLowerCase().replace(" ", "_");
  };
  const getHeaderHeight = useCallback( (refHeight) =>{
    setHeaderHeight(refHeight);
  }, [ setHeaderHeight ] );

  const handleNavClick = (title) => {
    const accordionBtnId = formatId(title);
    //added 10 for a little more padding
    const topOfElement = document.getElementById(accordionBtnId).offsetTop - (headerHeight + 10);
    window.scroll({ top: topOfElement, behavior: "smooth" });
  };

  if( locationDetailIsLoading ) return <Loader type={loaderTypes.SPINNER} />
  else return (
    <>
      <LocationDetailHeader
        locationDetail={locationDetail}
        onExpand={handleFullScreen ? () => handleFullScreen({selectedLocationCode:locationCode}) : null}
        getHeaderHeight = { getHeaderHeight }
      />
      <div className="location-detail-content-container">
        {!handleFullScreen && (
          <div className="map-details-nav">
            {/* added 32 for padding*/}
            <ul className="navbar-ul fixed-sticky-nav" style={{ top:headerHeight + 32 }}>
              { accordionArrObjs.map((section) => {
                  const { title } = section;
                  return (
                    <li className="nav-item" key={title}>
                      <button className="nav-link-btn" onClick={() => handleNavClick(title)}>
                        {title}
                      </button>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        )}
        <div className="accordion-container">
          <Accordion data={accordionArrObjs} formatId={formatId} />
        </div>
      </div>
    </>
  );
};

LocationDetails.propTypes = {
  handleFullScreen: PropTypes.func, 
  locationDetail: PropTypes.object,
  locationCode: PropTypes.string,
  locationDetailIsLoading: PropTypes.bool,
};


export default LocationDetails;
