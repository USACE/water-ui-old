import React from "react";
import MapNavBar from "./components/map-nav-bar/MapNavBar";
import MapDetails from "./components/map-details/MapDetails";
import LocationsMap from '../../app-common/map/LocationsMap';

const MapPage = () => {
  const opts = { center: [-95, 38.895], zoom: 5 };
  return (
    <main>
      <MapNavBar />
      <div
        className=" map-and-details-container "
        style={{ display: "flex", flexDirection: "row" }}
      >
        <MapDetails />
        <div className="map-container" style={{ padding: "0", flexGrow: 35 }}>
          <LocationsMap
            mapKey="locationsMap"
            height="75vh"
            options={opts}
          />
        </div>
      </div>
    </main>
  );
};

export default MapPage;
