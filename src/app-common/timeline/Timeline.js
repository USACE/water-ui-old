import React from "react";
import PropTypes from "prop-types";

// CSS
import "./timeline.scss";

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <time>{data.date}</time>
      <p>{data.text}</p>
      <span className="circle" />
    </div>
  </div>
);

const Timeline = ({ timelineData, align }) => {
  return (
    timelineData.length > 0 && (
      <div className={`outter-container ${align}`}>
        <div className="timeline-container">
          {timelineData.map((data, i) => (
            <TimelineItem data={data} key={i} />
          ))}
        </div>
      </div>
    )
  );
};

Timeline.defaultProps = {
  align: "vertical",
};
Timeline.propTypes = {
  data: PropTypes.array,
};

export default Timeline;
