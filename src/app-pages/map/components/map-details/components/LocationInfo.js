import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Table from "../../../../../app-common/table/Table";
import { damProfileKeys } from "./dam-profile/dam-profile-utils";
import { formatUnderscore } from "../../../../../utils/";

const LocationInfo = ({
  cwmsDetailData,
  /** @type a2w.models.CwmsLevel */
  cwmsLevelData,
}) => {
  const header = ["Name", "Value"];
  const body = [];
  Object.keys(cwmsDetailData).forEach((key) => {
    // add the data to the body if it's not dam profile data
    if (cwmsDetailData[key] && damProfileKeys.indexOf(key) < 0) {
      const name = formatUnderscore(key);
      const value = cwmsDetailData[key];
      body.push({
        rowId: key,
        row: [
          { id: "name", item: name },
          { id: "value", item: value },
        ],
      });
    }
  });

  // add the cwms location level to the table body
  if (cwmsLevelData) {
    cwmsLevelData.forEach(cwmsLevel => {
      const name = cwmsLevel.specified_level_id;
      const value = `${cwmsLevel.current_value} ${cwmsLevel.value_unit}`;
      body.push({
        rowId: cwmsLevel.location_level_id,
        row: [
          { id: "name", item: name },
          { id: "value", item: value },
        ],
      });
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
  cwmsLevelData: PropTypes.arrayOf(PropTypes.shape({
    location_level_id: PropTypes.string,
    specified_level_id: PropTypes.string,
    current_value: PropTypes.number,
    value_unit: PropTypes.string,
  })),
};

export default connect(
  "selectCwmsDetailData",
  "selectCwmsLevelData",
LocationInfo);
