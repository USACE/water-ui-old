import React from "react";
import PropTypes from 'prop-types';
import { connect } from "redux-bundler-react";
import Table from "../../../../../app-common/table/Table";
import { formatUnderscore } from "../../../../../utils/";

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
    <Table
      header={header}
      body={body}
    />
  );
};

DamProfile.propTypes = {
  locationDetailData: PropTypes.object.isRequired,
};

export default connect(
  "selectLocationDetailData",
  DamProfile
);
