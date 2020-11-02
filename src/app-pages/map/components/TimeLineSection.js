import React from "react";
// import PropTypes from "prop-types";
import Timeline from "../../../app-common/timeline/Timeline";
// import { connect } from "redux-bundler-react";

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

const TimeLineSection = () => {

  return (
    <div className="time-series-section-wrapper">
      <h5>TimeLine</h5>
      {timelineData ? (
        <Timeline timelineData={timelineData} align={"vertical"} maxHeight={"400px"} compact={true} />
      ) : null}
    </div>
  );
};

// TimeLineSection.propTypes = {

// };

export default TimeLineSection;
