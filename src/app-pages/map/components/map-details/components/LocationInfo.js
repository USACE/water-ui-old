import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Table from "../../../../../app-common/table/Table";
import { damProfileKeys } from "./DamProfile";
import { formatUnderscore } from "../../../../../utils/";

const LocationInfo = ({ locationDetailData }) => {
  const header = ["Name", "Value"];
  const body = [];
  Object.keys(locationDetailData).forEach((key) => {
    // add the data to the body if it's not dam profile data
    if (locationDetailData[key] && damProfileKeys.indexOf(key) < 0) {
      const name = formatUnderscore(key);
      const value = locationDetailData[key];
      body.push({
        id: key,
        row: [name, value],
      });
    }
  });

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
  locationDetailData: PropTypes.object,
};

export default connect("selectLocationDetailData", LocationInfo);
