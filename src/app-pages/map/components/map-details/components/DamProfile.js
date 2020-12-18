import React from "react";
import PropTypes from 'prop-types';
import { connect } from "redux-bundler-react";
import Table from "../../../../../app-common/table/Table";
import { formatUnderscore } from "../../../../../utils/";
import DamProfileChart  from "./dam-profile-chart/DamProfileChart";
import { isPresent } from "../../../../../utils/functions";

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

const DamProfile = ( props ) => {
  const {
    /** @type a2w.models.LocationDetail */
    locationDetailData
  } = props;

  // TODO: Remove table view when we switch to D3 graphic
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

  const data = {
    //mode could be lock or dam or lockTurbine or turbine. Create func to calc
    mode: "dam", //could be dam, lock, turbine, or lockTurbine. Based off hasLock and hasLock
    hasLock: false,
    hasTurbine: false,
    damTop: locationDetailData.top_of_dam,
    damBottom: locationDetailData.stream_bed,
    horizontalLabels: [],
    currentLevel: locationDetailData.current_elevation,
    tailWater: locationDetailData.current_tail_water_elevation,
    inflow: locationDetailData.current_inflow,
    outflow: locationDetailData.current_flow,
    surcharge: locationDetailData.current_surcharge,
    text: locationDetailData.public_name,
    date: locationDetailData.elevation_date,
    ruleCurve: locationDetailData.current_rule_curve,
    precip: locationDetailData.current_precipitation,
    designCapacity: locationDetailData.design_capacity,
    levelType: locationDetailData.level_type,
    gradientTop: undefined,
    gradientBottom: undefined,
    gradientLabel: [0,20,40,60,80,100],
    colorArr: undefined,
    colorLevels: undefined,
  };

  const addLabel = ( name, value, showLine, side ) => {
    if( isPresent( value ) ) {
      data.horizontalLabels.push( { name: name, value: value, showLine: showLine, side: side } )
    }
  }

  // Left labels
  addLabel( "Top of Dam", locationDetailData.top_of_dam, true, "left" );
  addLabel( "Top of Flood", locationDetailData.top_of_flood, true, "left" );
  addLabel( "Bottom of Flood", locationDetailData.bottom_of_flood, true, "left" );
  addLabel( "Streambed", locationDetailData.stream_bed, true, "left" );

  if( isPresent( locationDetailData.bottom_of_normal ) ) {
    addLabel( "Bottom of Conservation", locationDetailData.bottom_of_normal, true, "left" );
  }
  else addLabel( "Bottom of Conservation", locationDetailData.bottom_of_conservation, true, "left" );

  // Right labels
  addLabel( "Spillway Crest", locationDetailData.spillway_crest, true, "right" );
  addLabel( "Top of Surcharge", locationDetailData.top_of_surcharge, true, "left" );
  addLabel( "Design Capacity", locationDetailData.design_capacity, true, "left" );

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
