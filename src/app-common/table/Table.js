import React, { useState } from "react";
import PropTypes from "prop-types";

// CSS
import "./table.css";

const json = {
  office_id: "MVP",
  office_name: "St. Paul District",
  public_name: "Mississippi R Lock and Dam 03",
  long_name: "Mississippi River Lock and Dam 03",
  location_code: "4572016",
  location_id: "LockDam_03",
  location_kind_id: "PROJECT",
  latitude: 44.61,
  longitude: -92.61,
  elevation: 600,
  unit_id: "ft",
  time_zone_name: "US/Central",
  county_name: "Goodhue",
  state: "MN",
  nearest_city: "Red Wing",
  flood_storage_pct: 20,
  current_elevation: 374.2,
  daily_elevation_change: -1.37,
  dam_profile: {
    history: [
      {
        date: "2020-10-07T16:17:59.630Z",
        in_flow: 123,
        top_of_dam: 452.2,
        top_of_flood: 435,
        bottom_of_flood: 374.26,
        stream_bed: 369.2,
        out_flow: 123,
      },
    ],
  },
};
const Table = (props) => {
  // const { data } = props;
  const tableHeader = ["name", "value"];

  return (
    <div className="table-container" data-test="table-container">
      <table>
        <tr>
          {tableHeader.map((item) => {
            return <th>{item}</th>;
          })}
        </tr>
        {json.map((item) => {
          return (
            <tr>
              <td>January</td>
              <td>$100</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

Table.propTypes = {
  // data: PropTypes.array,
};

export default Table;
