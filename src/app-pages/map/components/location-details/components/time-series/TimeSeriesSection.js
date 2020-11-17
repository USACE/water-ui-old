import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import A2WPlot from "../../../../../../app-common/plotly/A2Wplot";
import TimeSeriesTable from "./TimeSeriesTable";

const TimeSeriesSection = ({
  locationTimeSeriesPlotlyData
}) => {
  const [plotIndex, setPlotIndex] = useState(0);

  if (locationTimeSeriesPlotlyData.length === 0) {
    return null;
  }

  const data = locationTimeSeriesPlotlyData.map(plotlyData => ({
    ...plotlyData,
    type: "scatter",
    mode: "lines",
  }));

  const layout = {
    width: 600,
    title: data[plotIndex].name,
    yaxis: {
      title: data[plotIndex].unit,
    },
  };

  return (
    <div className="time-series-section-wrapper">
      <A2WPlot
        data={[ data[plotIndex] ]}
        layout={layout}
        config={{scrollZoom: true}}
      />
      <TimeSeriesTable
        data={data}
        plotIndex={plotIndex}
        setPlotIndex={setPlotIndex}
      />
    </div>
  );
};

TimeSeriesSection.propTypes = {
  locationTimeSeriesPlotlyData: PropTypes.array.isRequired,
};

export default connect(
  "selectLocationTimeSeriesPlotlyData",
  TimeSeriesSection
);
