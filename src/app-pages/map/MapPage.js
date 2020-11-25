import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import MapNavBar from "./components/map-nav-bar/MapNavBar";
import MapDetailsContainer from "./components/map-details/MapDetailsContainer";
import Map from "./components/Map";
import "./mapPage.scss";

const MapPage = ({
  queryObject,
  doUpdateUrl,
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
      <MapNavBar
        queryObject={queryObject}
        doUpdateUrl={doUpdateUrl}
      />
      <div className="map-page-content">
        <MapDetailsContainer
          queryObject={queryObject}
          doUpdateUrl={doUpdateUrl}
        />
        <Map
          queryObject={queryObject}
          doUpdateUrl={doUpdateUrl}
        />
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
  doUpdateUrl: PropTypes.func.isRequired,
  doLocationDetailSetCode: PropTypes.func.isRequired,
};

export default connect(
  "selectQueryObject",
  "doUpdateUrl",
  "doLocationDetailSetCode",
  MapPage
)
