import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import { connect } from "redux-bundler-react";
import Table from "../../../../../app-common/table/Table";
import { formatUnderscore } from "../../../../../utils/";
import DamProfileChart  from "./dam-profile-chart/DamProfileChart";
import { isPresent } from "../../../../../utils/functions";

// array of all the dam profile keys
/** @type { ( keyof a2w.models.CwmsDetail )[] } */
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

// helper function which computes the data for the DamProfileChart
const getDamProfileData = (cwmsDetailData) => {
  const data = {
    //mode could be lock or dam or lockTurbine or turbine. Create func to calc
    mode: "dam", //could be dam, lock, turbine, or lockTurbine. Based off hasLock and hasLock
    hasLock: false,
    hasTurbine: false,
    damTop: cwmsDetailData.top_of_dam,
    damBottom: cwmsDetailData.stream_bed,
    horizontalLabels: [],
    currentLevel: cwmsDetailData.current_elevation,
    tailWater: cwmsDetailData.current_tail_water_elevation,
    inflow: cwmsDetailData.current_inflow,
    outflow: cwmsDetailData.current_flow,
    surcharge: cwmsDetailData.current_surcharge,
    text: cwmsDetailData.public_name,
    date: cwmsDetailData.elevation_date,
    ruleCurve: cwmsDetailData.current_rule_curve,
    precip: cwmsDetailData.current_precipitation,
    designCapacity: cwmsDetailData.design_capacity,
    levelType: cwmsDetailData.level_type,
    gradientTop: cwmsDetailData.top_of_flood,
    gradientBottom: cwmsDetailData.bottom_of_flood,
    gradientLabel: [0,20,40,60,80,100],
    colorArr: ["red", "yellow", "yellow", "green"],
    colorLevels: [0.0, 0.2, 0.3, 0.4],
  };

  const addLabel = ( name, value, showLine, side ) => {
    if( isPresent( value ) ) {
      data.horizontalLabels.push( { name: name, value: value, showLine: showLine, side: side } )
    }
  };

  // Left labels
  addLabel( "Top of Dam", cwmsDetailData.top_of_dam, true, "left" );
  addLabel( "Top of Flood", cwmsDetailData.top_of_flood, true, "left" );
  addLabel( "Bottom of Flood", cwmsDetailData.bottom_of_flood, true, "left" );
  addLabel( "Streambed", cwmsDetailData.stream_bed, true, "left" );

  if( isPresent( cwmsDetailData.bottom_of_normal ) ) {
    addLabel( "Bottom of Conservation", cwmsDetailData.bottom_of_normal, true, "left" );
  }
  else addLabel( "Bottom of Conservation", cwmsDetailData.bottom_of_conservation, true, "left" );

  // Right labels
  addLabel( "Spillway Crest", cwmsDetailData.spillway_crest, true, "right" );
  addLabel( "Top of Surcharge", cwmsDetailData.top_of_surcharge, true, "left" );
  addLabel( "Design Capacity", cwmsDetailData.design_capacity, true, "left" );

  return data;
};

const DamProfile = ( props ) => {
  const {
    /** @type a2w.models.CwmsDetail */
    cwmsDetailData
  } = props;

  // TODO: Remove table view when we switch to D3 graphic
  const unit = cwmsDetailData.unit_id ? ` (${cwmsDetailData.unit_id })` : "";
  const header = ["Name", `Value${unit}`];
  const body = [];
  damProfileKeys.forEach((key) => {
    if (cwmsDetailData[key]) {
      const name = formatUnderscore(key);
      const value = cwmsDetailData[key];
      body.push({
        id: key,
        row: [name, value],
      });
    }
  });

  const memoizedData = useMemo(() => getDamProfileData(cwmsDetailData), [ cwmsDetailData ]);

  if (body.length === 0) {
    return <p>No dam profile data.</p>
  }
  return (
    <>
      <DamProfileChart data={ memoizedData } />
      <Table
        header={ header }
        body={ body }
      />
    </>
  );
};

DamProfile.propTypes = {
  cwmsDetailData: PropTypes.object.isRequired,
  data: PropTypes.object
};

export default connect(
  "selectCwmsDetailData",
  DamProfile
);
