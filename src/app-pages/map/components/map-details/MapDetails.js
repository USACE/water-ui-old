import React, { useEffect, useState } from "react";
import { connect } from "redux-bundler-react";
import LocationDetailHeader from "../../../../app-common/location-detail/Header";
import Accordion from "../../../../app-common/accordion/Accordion";
import { accordionArrObjs } from "./data";
import PropTypes from 'prop-types';
import "./mapDetails.scss";

const MapDetails = ( props ) => {
  const {
    doSetSelectedLocationCode,
    selectedLocationCode,
    /** @type a2w.models.LocationDetail */
    selectedLocationDetail,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    let wasOpen = isOpen;
    setIsOpen(!isOpen);
    if (wasOpen) doSetSelectedLocationCode(null);
  };

  useEffect(() => {
    if (!isOpen && selectedLocationCode) toggleDrawer();
  });

  /** @type {React.CSSProperties} */
  const mapDetailsStyle = Object.keys(selectedLocationDetail) && Object.keys(selectedLocationDetail).length > 0
    ? { padding: 0, flexGrow: 1 }
    : { visibility: "hidden" };

  return (
    <div className="map-details" style={mapDetailsStyle}>
      <div className="map-details-wrapper">
        <div className={`${isOpen ? "is-expanded" : ""}`} onClick={toggleDrawer}>
          <div className="drawer-content-container">
            <div className={`${isOpen ? "drawer-content" : "display-none"}`}>
              <LocationDetailHeader
                locationDetail={selectedLocationDetail}
              ></LocationDetailHeader>
              <div className="location-detail-content-container">
                <Accordion data={accordionArrObjs} />
              </div>
            </div>

            <div className="outer-container">
              <div className="drawer-icon-container">
                <div
                  className="icons mdi mdi-water-pump"
                  title="Dam Profile"
                ></div>
                <div
                  className="icons mdi mdi-chart-line"
                  title="Time Series"
                ></div>
                <div className="icons mdi mdi-map-marker" title="Location"></div>
                <div className="icons mdi mdi-layers" title="Sedimentation"></div>
                <div
                  className="icons mdi mdi-blur-linear"
                  title="Grab Samples"
                ></div>
                <div
                  className="icons mdi mdi-crop-square"
                  title="Box Plots"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MapDetails.propTypes = {
  doSetSelectedLocationCode: PropTypes.func.isRequired,
  selectedLocationCode: PropTypes.string,
  selectedLocationDetail: PropTypes.object,
};

export default connect(
  "doSetSelectedLocationCode",
  "selectSelectedLocationCode",
  "selectSelectedLocationDetail",
  MapDetails
);
