import React from "react";
import MapDetailsContent from "../../app-common/map-details-container/MapDetailsContent";
import { connect } from "redux-bundler-react";


const LocationPage = ({selectedLocationDetail}) => {
  return (
    <main>
      <div
        className=" map-and-details-container "
        style={{ display: "flex", flexDirection: "row" }}
      >
        <MapDetailsContent locationDetail={selectedLocationDetail}/>
      </div>
    </main>
  );
};

export default connect(
  "selectSelectedLocationCode",
  "selectSelectedLocationDetail", LocationPage);

