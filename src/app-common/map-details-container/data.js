import React from "react";
import LocationInfo from "../../app-pages/map/components/LocationInfo";
import DamProfile from "../../app-pages/map/components/DamProfile";
import TimesSeriesSection from "../../app-pages/map/components/TimeSeriesSection"

// Accordion dummy data
export const accordionArrObjs = [
  {
    title: "Dam Profile",
    content: <DamProfile />,
    iconClass: "mdi mdi-water-pump",
  },
  {
    title: "Location Information",
    content: <LocationInfo />,
    iconClass: "mdi mdi-map-marker",
  },
  {
    title: "Time Series",
    content: <TimesSeriesSection/>,
    iconClass: "mdi mdi-chart-timeline",
  },
  {
    title: "Sedimentation",
    content:
      "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
    iconClass: "mdi mdi-map-marker",
  },
];
