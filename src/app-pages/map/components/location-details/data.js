import DamProfile from "./components/DamProfile";
import LocationInfo from "./components/LocationInfo";
import TimeSeriesSection from "./components/time-series/TimeSeriesSection";
import TimeLineSection from "./components/TimeLineSection";

// Accordion dummy data
export const accordionArrObjs = [
  {
    title: "Dam Profile",
    Component: DamProfile,
    iconClass: "mdi mdi-water-pump",
  },
  {
    title: "Location Information",
    Component: LocationInfo,
    iconClass: "mdi mdi-map-marker",
  },
  {
    title: "Time Series",
    Component: TimeSeriesSection,
    iconClass: "mdi mdi-chart-timeline",
  },
  {
    title: "TimeLine",
    Component: TimeLineSection,
    iconClass: "mdi mdi-chart-timeline",
  },
  {
    title: "Sedimentation",
    Component: () => "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
    iconClass: "mdi mdi-map-marker",
  },
];
