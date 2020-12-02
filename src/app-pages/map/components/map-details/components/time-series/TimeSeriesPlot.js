import React from "react";
import PropTypes from "prop-types";
import A2WPlot from "../../../../../../app-common/plotly/A2Wplot";

const TimeSeriesPlot = ({ locationTimeSeriesPlotlyData, plotName }) => {
  if (!locationTimeSeriesPlotlyData || Object.keys(locationTimeSeriesPlotlyData).length === 0) {
    return (
      <>
        <p>No data for the selected date range.</p>
        <br />
      </>
    );
  } else if (!locationTimeSeriesPlotlyData[plotName]) {
    return null;
  }

  const layout = {
    autosize: true,
    margin: { t: 70, b: 50, l: 70, r: 70 },
    title: plotName,
    yaxis: {
      title: locationTimeSeriesPlotlyData[plotName].unit,
    },
  };
  const config = {
    scrollZoom: true,
  };
  return (
    <A2WPlot
      data={[ locationTimeSeriesPlotlyData[plotName] ]}
      layout={layout}
      config={config}
      useResizeHandler
    />
  )
};

TimeSeriesPlot.propTypes = {
  locationTimeSeriesPlotlyData: PropTypes.object,
  plotName: PropTypes.string.isRequired,
};

export default TimeSeriesPlot;
