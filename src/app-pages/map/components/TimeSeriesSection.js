import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import A2WPlot from "../../../app-common/plotly/A2Wplot";

const TimeSeriesSection = ({
  locationTimeSeries
}) => {
  console.log('locationTimeSeries = ', locationTimeSeries );

  return (
    <div className="time-series-section-wrapper">
      <h5>Time Series</h5>
      <A2WPlot
        data={[
          {
            y: [0, 1, 1, 2, 3, 5, 8, 13, 21],
            boxpoints: 'all',
            jitter: 0.3,
            pointpos: -1.8,
            type: 'box'
          }
        ]}
        layout={{ width: 500, height: 400, title: 'Test Plot' }}
      />
    </div>
  );
};

TimeSeriesSection.propTypes = {
  locationTimeSeriesData: PropTypes.array,
};

export default connect(
  "selectLocationTimeSeries",
  TimeSeriesSection
);
