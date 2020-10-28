import React,{useEffect} from "react";
import MapDetailsContent from "../../app-common/map-details-container/MapDetailsContent";
import { connect } from "redux-bundler-react";


const LocationPage = ({selectedLocationDetail,selectedLocationCode}) => {
  useEffect (() => {
    //get location detail of location code in params
  },[]);
  return (
    <main>
      <div
        className=" map-and-details-container "
        style={{ display: "flex", flexDirection: "row" }}
      >
        <MapDetailsContent locationDetail={selectedLocationDetail} locationCode={selectedLocationCode}/>
      </div>
    </main>
  );
};

export default connect(
  "selectSelectedLocationCode",
  "selectSelectedLocationDetail", LocationPage);

