import React from "react";
import { connect } from "redux-bundler-react";
import A2WPlot from "../../../app-common/plotly/A2Wplot";

const TimeSeriesSection = ({

}) => {

  return (
    <div className="time-series-section-wrapper">
      <h5>Time Series</h5>
      {/* test to see that it worked */}
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
        layout={ {width: 500, height: 400, title: 'Test Plot'} }
      />
    </div>
  );
};


export default connect(
  "selectLocationTimeSeries",
  TimeSeriesSection
);
