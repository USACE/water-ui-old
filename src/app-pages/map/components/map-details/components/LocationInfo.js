import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Table from "../../../../../app-common/table/Table";
import { damProfileKeys } from "./DamProfile";
import { formatUnderscore } from "../../../../../utils/";

const LocationInfo = ({ cwmsDetailData, locationLevelData }) => {
  const header = ["Name", "Value"];
  const body = [];
  Object.keys(cwmsDetailData).forEach((key) => {
    // add the data to the body if it's not dam profile data
    if (cwmsDetailData[key] && damProfileKeys.indexOf(key) < 0) {
      const name = formatUnderscore(key);
      const value = cwmsDetailData[key];
      body.push({
        id: key,
        row: [name, value],
      });
    }
  });

  // add the location level to the table body
  if (locationLevelData) {
    locationLevelData.forEach(locationLevel => {
      const name = locationLevel.specified_level_id;
      const value = `${locationLevel.current_value} ${locationLevel.value_unit}`;
      body.push({
        id: locationLevel.location_level_id,
        row: [name, value],
      })
    });
  }

  if (body.length === 0) {
    return <p>No location information data.</p>
  }
  return (
    <Table
      header={header}
      body={body}
    />
  );
};

LocationInfo.propTypes = {
  cwmsDetailData: PropTypes.object,
  locationLevelData: PropTypes.arrayOf(PropTypes.shape({
    location_level_id: PropTypes.string,
    specified_level_id: PropTypes.string,
    current_value: PropTypes.number,
    value_unit: PropTypes.string,
  })),
};

export default connect(
  "selectCwmsDetailData",
  "selectLocationLevelData",
LocationInfo);
