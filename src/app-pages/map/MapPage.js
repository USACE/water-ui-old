import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import MapNavbar from "./components/map-navbar/MapNavbar";
import MapDetailsContainer from "./components/map-details/MapDetailsContainer";
import Map from "./components/map/Map";

const MapPage = ({
  locationMapQueryObject: queryObject,
  doLocationDetailFetch,
}) => {
  const locationId = queryObject.locationId || "";
  useEffect(() => {
    doLocationDetailFetch();
  }, [locationId, doLocationDetailFetch])

  return (
    <>
      <MapNavbar />
      <div>
        <MapDetailsContainer />
        <Map />
      </div>
    </>
  );
};

MapPage.propTypes = {
  locationMapQueryObject: PropTypes.shape({
    locationId: PropTypes.string,
  }).isRequired,
  doLocationDetailFetch: PropTypes.func.isRequired,
};

export default connect(
  "selectLocationMapQueryObject",
  "doLocationDetailFetch",
  MapPage
);
