import React from "react";
import DamProfile from "./components/DamProfile";
import LocationInfo from "./components/LocationInfo";
import TimeSeriesSection from "./components/time-series/TimeSeriesSection";
import TimeLineSection from "./components/TimeLineSection";

const sectionConfigs = {
  damProfile: {
    id: "dam-profile",
    title: "Dam Profile",
    content: <DamProfile />,
    iconClass: "mdi mdi-water-pump",
  },
  locationInfo: {
    id: "location-information",
    title: "Location Information",
    content: <LocationInfo />,
    iconClass: "mdi mdi-map-marker",
  },
  timeSeries: {
    id: "time-series",
    title: "Time Series",
    content: <TimeSeriesSection/>,
    iconClass: "mdi mdi-chart-timeline",
  },
  timeline: {
    id: "time-line",
    title: "Time Line",
    content: <TimeLineSection/>,
    iconClass: "mdi mdi-chart-timeline",
  },
  sedimentation: {
    id: "sedimentation",
    title: "Sedimentation",
    content: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
    iconClass: "mdi mdi-map-marker",
  }
}

export function buildLocationDetailSections( /** @type a2w.models.LocationDetail */ locationDetail ) {
  const result = [];
  if( !locationDetail ) return result;

  if( locationDetail.dam_indicator === "T" ) result.push( sectionConfigs.damProfile );
  result.push( sectionConfigs.locationInfo );
  result.push( sectionConfigs.timeSeries );
  result.push( sectionConfigs.timeline );
  //result.push( sectionConfigs.sedimentation );

  return result;
}
