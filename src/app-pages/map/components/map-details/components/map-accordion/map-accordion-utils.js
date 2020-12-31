import React from "react";
import DamProfile from "../dam-profile/DamProfile";
import LocationInfo from "../LocationInfo";
import LocationChildren from "../LocationChildren";
import TimeSeriesSection from "../time-series/TimeSeriesSection";
import TimeLineSection from "../TimeLineSection";
import NidSection from "../NidSection";

export const getCwmsAccordionData = (locationSummaryData, cwmsChildrenData) => {
  const accordionData = [];
  if (locationSummaryData.dam_indicator === "T") {
    accordionData.push({
      id: "dam-profile",
      title: "Dam Profile",
      content: <DamProfile />,
      iconClass: "mdi mdi-water-pump",
    }, {
      id: "nid-section",
      title: "NID",
      content: <NidSection />,
      iconClass: "mdi mdi-table"
    });
  }
  accordionData.push({
    id: "location-information",
    title: "Location Information",
    content: <LocationInfo />,
    iconClass: "mdi mdi-map-marker",
  });
  if (cwmsChildrenData && cwmsChildrenData.length > 0) {
    accordionData.push({
      id: "location-children",
      title: "Location Children",
      content: <LocationChildren />,
      iconClass: "mdi mdi-map-marker-radius",
    });
  }
  accordionData.push({
    id: "time-series",
    title: "Time Series",
    content: <TimeSeriesSection/>,
    iconClass: "mdi mdi-chart-line",
  }, {
    id: "time-line",
    title: "Time Line",
    content: <TimeLineSection/>,
    iconClass: "mdi mdi-chart-timeline",
  });
  return accordionData;
};

export const getWqAccordionData = () => {
  // TODO: create accordion data for wq source
  const accordionData = [];
  return accordionData;
};
