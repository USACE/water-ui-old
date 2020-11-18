import React, { useEffect } from "react";
import MapNavBar from "./components/map-nav-bar/MapNavBar";
import LocationDetailsContainer from "./components/location-details/LocationDetailsContainer";
import LocationsMap from "./components/LocationsMap";
import { connect } from "redux-bundler-react";

const MapPage = ( {doLocationSummariesFetch }) => {
  const opts = { center: [-95, 38.895], zoom: 5 };

  useEffect(() => {
    doLocationSummariesFetch();
  }, [doLocationSummariesFetch])

  return (
    <>
      <MapNavBar />
      <div
        className=" map-and-details-container "
        style={{ display: "flex", flexDirection: "row" }}
      >
        <LocationDetailsContainer />
        <div className="map-container" style={{ padding: "0", flexGrow: 35 }}>
          <LocationsMap
            mapKey="locationsMap"
            height="75vh"
            options={opts}
          />
        </div>
      </div>
    </>
  );
};

export default connect(
  "doLocationSummariesFetch",
  MapPage
)
