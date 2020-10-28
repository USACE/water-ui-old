import React from "react";
import LocationDetailHeader from "../location-detail/Header";
import Accordion from "../accordion/Accordion";
import { accordionArrObjs } from "./data";



const MapDetailsContent = ({handleFullScreen,locationDetail,locationCode}) => {
  // console.log("selectedLocationCode: ",locationCode);
  // console.log("selectedLocationDetail: ",locationDetail);
  return (
    <main>
      <LocationDetailHeader
        locationDetail={locationDetail}
        onExpand={handleFullScreen ? () => handleFullScreen(locationCode): null}
      ></LocationDetailHeader>
      <div className="location-detail-content-container">
        <Accordion data={accordionArrObjs} />
      </div>
    </main>
  );
};

export default MapDetailsContent;
