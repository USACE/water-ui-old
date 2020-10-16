import React from "react";
import PropTypes from "prop-types";

// CSS
import "./timeline.scss";

const Timeline = ({ timelineData, align, maxHeight, maxWidth, compact }) => {
  return (
    timelineData &&
    timelineData.length > 0 && (
      <div className={`outer-timeline-container ${align}`}
           style={ { maxHeight: maxHeight, maxWidth: maxWidth } }>
        <div className={`timeline-container ${compact ? "compact" : ""}`}>
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
  maxHeight: "100%",
  maxWidth: "100%",
  compact: false
};
Timeline.propTypes = {
  data: PropTypes.array,
};

export default Timeline;
