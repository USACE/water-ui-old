import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import MapNavBar from "./components/map-nav-bar/MapNavBar";
import MapDetailsContainer from "./components/map-details/MapDetailsContainer";
import Map from "./components/map/Map";

const MapPage = ({
  queryObject,
  doLocationDetailSetCode,
}) => {
  console.log("MapPage() -> queryObject = ", queryObject);
  const locationId = queryObject.locationId || "";
  useEffect(() => {
    if (locationId || locationId === 0) {
      doLocationDetailSetCode(locationId);
    }
  }, [locationId, doLocationDetailSetCode])

  return (
    <>
      <MapNavBar />
      <div>
        <MapDetailsContainer />
        <Map />
      </div>
    </>
  );
};

MapPage.propTypes = {
  queryObject: PropTypes.shape({
    locationId: PropTypes.string,
    lat: PropTypes.string,
    lon: PropTypes.string,
    zoom: PropTypes.string,
  }).isRequired,
  doLocationDetailSetCode: PropTypes.func.isRequired,
};

export default connect(
  "selectQueryObject",
  "doLocationDetailSetCode",
  MapPage
)
