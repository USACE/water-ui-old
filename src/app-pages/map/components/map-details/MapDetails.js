import React, { useEffect, useState } from "react";
import { connect } from "redux-bundler-react";
import PropTypes from "prop-types";
import "./mapDetails.scss";
import MapDetailsContent from "../../../../app-common/map-details-container/MapDetailsContent";
import { RoutePaths } from "../../../../app-bundles/routes-bundle";

const MapDetails = ( props ) => {
  const {
    locationDetailCode,
    /** @type a2w.models.LocationDetail */
    locationDetailData,
    locationDetailIsLoading,
    doUpdateUrlWithHomepage,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // open the map sidebar if the locationDetailCode changes
  useEffect(() => {
    if (locationDetailCode) {
      setIsOpen(true);
    }
  }, [locationDetailCode, setIsOpen]);

  /** @type {React.CSSProperties} */
  const mapDetailsStyle =
    Object.keys(locationDetailData) && Object.keys(locationDetailData).length > 0
      ? { padding: 0, flexGrow: 1 }
      : { visibility: "hidden" };

  const handleFullScreen = (selectedLocationCode, doUpdateUrlWithHomepage) => {
    setIsFullScreen(true);
    const newLocation = `${RoutePaths.Locations.replace(":locationId", selectedLocationCode)}`;

    //set timeout to allow css transition to happen
    // added simple fade, will replace later.
    setTimeout(function () {
      document.body.classList.toggle("fade");
      doUpdateUrlWithHomepage(newLocation);
      setTimeout(function () {
        document.body.classList.toggle("fade");
      }, 700);
    }, 500);
  };
  return (
    <div className="map-details" style={mapDetailsStyle}>
      <div className="map-details-wrapper">
        <div className={`${isOpen ? "is-expanded" : ""}`} onClick={toggleDrawer}>
          <div className={`${isFullScreen ? "full-screen " : "drawer-content-container"}`}>
            <div className={`${isOpen ? "drawer-content" : "display-none"}`}>
              <MapDetailsContent
                handleFullScreen={() => handleFullScreen(locationDetailCode, doUpdateUrlWithHomepage)}
                locationDetail={locationDetailData}
                locationCode={locationDetailCode}
                locationDetailIsLoading={locationDetailIsLoading}
              />
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
      </div>
    </div>
  );
};

MapDetails.propTypes = {
  selectedLocationCode: PropTypes.string,
  locationDetailData: PropTypes.object,
  doUpdateUrlWithHomepage: PropTypes.func.isRequired,
};

export default connect(
  "selectLocationDetailCode",
  "selectLocationDetailData",
  "selectLocationDetailIsLoading",
  "doUpdateUrlWithHomepage",
  MapDetails
);
