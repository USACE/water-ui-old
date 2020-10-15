import React from "react";
import Timeline from "../../../../app-common/timeline/Timeline";
import LocationInfo from "../LocationInfo";
import DamProfile from "../DamProfile";

//Timeline Dummy Data
export const timelineData = [
  {
    text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
    date: "January 1 2020",
  },
  {
    text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
    date: "February 1 2020",
  },
  {
    text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
    date: "March 01 2020",
  },
  {
    text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
    date: "April 01 2020",
  },
  {
    text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
    date: "May 01 2020",
  },
];

// Accordion dummy data
export const accordionArrObjs = [
  {
    title: "Dam Profolio",
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
    content: <Timeline timelineData={timelineData} align={"vertical"} />,
    iconClass: "mdi mdi-map-marker",
  },
  {
    title: "Sedimentation",
    content:
      "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
    iconClass: "mdi mdi-map-marker",
  },
];
