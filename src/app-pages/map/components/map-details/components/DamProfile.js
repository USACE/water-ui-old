import React from "react";
import PropTypes from 'prop-types';
import { connect } from "redux-bundler-react";
import Table from "../../../../../app-common/table/Table";
import { formatUnderscore } from "../../../../../utils/";
import DamProfileChart  from "./dam-profile-chart/DamProfileChart";

// array of all the dam profile keys
/** @type { ( keyof a2w.models.LocationDetail )[] } */
export const damProfileKeys = [
  "top_of_dam",
  "top_of_surcharge",
  "top_of_flood",
  "spillway_crest",
  "bottom_of_flood",
  "current_elevation",
  "bottom_of_conservation",
  "stream_bed",
  "current_inflow",
  "current_surcharge",
];

// /** @type a2w.models.DamProfileHistoryEntry[] */
// const damD3ChartKeys = [
//   "date",
//   "in_flow",
//   "top_of_dam",
//   "top_of_flood",
//   "bottom_of_flood",
//   "stream_bed",
//   "out_flow",
// ];
// Using dummy default data for now. Will put additonal logic in for mode and horizontalLabels. 
const data = {
  //mode could be lock or dam or lockTurbine or turbine. Create func to calc
  mode: undefined, 
  hasLock: undefined,
  hasTurbine: undefined,
  damTop: undefined,
  damBottom: undefined,
  horizontalLabels: [
    { name: "Top of Dam", value: 1000, showLine: true, side: "left"},
    { name: "Top of Flood", value: 950, showLine: true, side: "left"},
    { name: "Top of Conservation", value: 790, showLine: true, side: "left" },
  ],
  currentLevel: undefined,
  tailWater: undefined,
  inflow: undefined,
  outflow: undefined,
  sur: undefined,
  text: undefined,
  date: undefined,
};

const DamProfile = ({ locationDetailData }) => {
  const unit = locationDetailData.unit_id ? ` (${locationDetailData.unit_id })` : "";
  const header = ["Name", `Value${unit}`];
  const body = [];
  damProfileKeys.forEach((key) => {
    if (locationDetailData[key]) {
      const name = formatUnderscore(key);
      const value = locationDetailData[key];
      body.push({
        id: key,
        row: [name, value],
      });
    }
  });

  if (body.length === 0) {
    return <p>No dam profile data.</p>
  }
  return (
    <>
    <DamProfileChart data={ data } />
    <Table
      header={ header }
      body={ body }
    />
    </>
  );
};

DamProfile.propTypes = {
  locationDetailData: PropTypes.object.isRequired,
  data: PropTypes.object
};

export default connect(
  "selectLocationDetailData",
  DamProfile
);
