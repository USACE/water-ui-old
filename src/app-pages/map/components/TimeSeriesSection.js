import React from "react";
// import PropTypes from "prop-types";
import Timeline from "../../../app-common/timeline/Timeline";

//Timeline Dummy Data
 const timelineData = [
  {
    text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
    date: "January 1 2020",
  },
  {
    text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
    date: "February 1 2020",
  },
  {
    text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
    date: "March 01 2020",
  },
  {
    text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
    date: "April 01 2020",
  },
  {
    text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
    date: "May 01 2020",
  },
];

const TimeSeriesSection = () => {

  return (
    <div className="time-series-section-wrapper">
      <h5>Time Series</h5>
      {timelineData ? (
        <Timeline timelineData={timelineData} align={"vertical"} />
      ) : null}
    </div>
  );
};

// TimeSeries.propTypes = {

// };

export default TimeSeriesSection;
