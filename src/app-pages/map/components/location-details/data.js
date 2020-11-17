import React from "react";
import DamProfile from "./components/DamProfile";
import LocationInfo from "./components/LocationInfo";
import TimeSeriesSection from "./components/time-series/TimeSeriesSection";
import TimeLineSection from "./components/TimeLineSection";

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
    content: <TimeSeriesSection/>,
    iconClass: "mdi mdi-chart-timeline",
  },
  {
    title: "TimeLine",
    content: <TimeLineSection/>,
    iconClass: "mdi mdi-chart-timeline",
  },
  {
    title: "Sedimentation",
    content: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
    iconClass: "mdi mdi-map-marker",
  },
];
