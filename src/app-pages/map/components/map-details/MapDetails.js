import React, { useEffect, useState } from "react";
import "./mapDetails.css";
import LocationDetailHeader from "../../../../app-common/location-detail/Header";
import Accordion from "../../../../app-common/accordion/Accordion";
import { connect } from "redux-bundler-react";
// import PropTypes from 'prop-types';

const MapDetails = ( { doSetSelectedLocationCode, selectedLocationCode, selectedLocationDetail } ) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    let wasOpen = isOpen;
    setIsOpen(!isOpen);
    if( wasOpen ) doSetSelectedLocationCode( null );
  }

  useEffect( () => {
    if( !isOpen && selectedLocationCode ) toggleDrawer();
  });

  // Accordion dummy date
  const accordionArrObjs = [
    {
      title: "Dam Profolio",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
      iconClass: "mdi mdi-water-pump"
    },
    {
      title: "Location Data",
      content:
        "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
      iconClass: "mdi mdi-map-marker"
    },
    {
      title: "Time Series",
      content:
        "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
      iconClass: "mdi mdi-map-marker"
    },
    {
      title: "Sedimentation",
      content:
        "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
      iconClass: "mdi mdi-map-marker"
    },
  ];

  return (
    <div
      className={`map-details-wrapper ${isOpen ? "is-expanded" : ""}`}
      onClick={toggleDrawer}
    >
      <div className="drawer-content-container">
        <div className="drawer-content">
          <LocationDetailHeader locationDetail={ selectedLocationDetail }></LocationDetailHeader>
          <Accordion data={accordionArrObjs} />
        </div>

        <div className="outer-container">
          <div className="drawer-icon-container">
            <div className="icons mdi mdi-water-pump" title="Dam Profile"></div>
            <div className="icons mdi mdi-chart-line" title="Time Series"></div>
            <div className="icons mdi mdi-map-marker" title="Location"></div>
            <div className="icons mdi mdi-layers" title="Sedimentation"></div>
            <div className="icons mdi mdi-blur-linear" title="Grab Samples"></div>
            <div className="icons mdi mdi-crop-square" title="Box Plots"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MapDetails.propTypes = {
//   // bla: PropTypes.string,
// };

export default connect(
  "doSetSelectedLocationCode",
  "selectSelectedLocationCode",
  "selectSelectedLocationDetail",
  MapDetails
);
