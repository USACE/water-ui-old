import React from "react";
import MapNavBar from "./components/MapNavBar";
import MapDetails from "./components/map-details/MapDetails";
import MapContainer from '../../app-common/map/MapContainer';
import { connect } from "redux-bundler-react";

const MapPage = ({ selectedLocationDetail }) => {
  const opts = { center: [-95, 38.895], zoom: 5 };
  const mapDetailsStyle = Object.keys(selectedLocationDetail) && Object.keys(selectedLocationDetail).length > 0
    ? { padding: 0, flexGrow: 1 }
    : { visibility: "hidden" };
  return (
    <main>
      <MapNavBar />
      <div
        className=" map-and-details-container "
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="map-details" style={mapDetailsStyle}>
          <MapDetails />
        </div>
        <div className="map-container" style={{ padding: "0", flexGrow: 35 }}>
          <MapContainer
            mapKey="locationsMap"
            height="900px"
            options={opts}
          />
        </div>
      </div>
    </main>
  );
};
export default connect("selectSelectedLocationDetail", MapPage);
