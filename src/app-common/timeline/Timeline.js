import React from "react";
import PropTypes from "prop-types";

// CSS
import "./timeline.scss";

const Timeline = ({ timelineData, align }) => {
  return (
    timelineData &&
    timelineData.length > 0 && (
      <div className={`outter-container ${align}`}>
        <div className="timeline-container">
          {timelineData.map((data, i) => {
            const { date, text } = data;
            return (
              <div className="timeline-item" key={i}>
                <div className="timeline-item-content">
                  <time>{date}</time>
                  <p>{text}</p>
                  <span className="circle" />
                </div>
              </div>
            );
          })}
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
