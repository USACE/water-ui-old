import React from "react";
import MapNavbar from "./components/map-navbar/MapNavbar";
import MapDetailsContainer from "./components/map-details/MapDetailsContainer";
import Map from "./components/map/Map";

const MapPage = () => (
  <>
    <MapNavbar />
    <div>
      <MapDetailsContainer />
      <Map />
    </div>
  </>
);

export default MapPage;
