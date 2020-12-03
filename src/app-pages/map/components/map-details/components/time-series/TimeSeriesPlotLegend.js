import React from "react";
import PropTypes from "prop-types";
import Sparkline from "../../../../../../app-common/plotly/Sparkline";
import "./time-series.scss";

// renders a lgend of all the plotly graphs
const TimeSeriesPlotLegend = ({
  locationTimeSeriesPlotlyData,
  plotName,
  setPlotName,
}) => {
  if (!locationTimeSeriesPlotlyData || Object.keys(locationTimeSeriesPlotlyData).length === 0) {
    return null;
  }

  const legend = Object.keys(locationTimeSeriesPlotlyData).map(key => ({
    ...locationTimeSeriesPlotlyData[key],
  }));

  return (
    <table className="table time-series-table">
      <thead>
        <tr>
          <th>Time Series</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {legend.map(plot => (
          <tr
            key={plot.name}
            className={plot.name === plotName ? "time-series-selected-row" : ""}
            onClick={() => setPlotName(plot.name)}
          >
            <td>{ plot.name }</td>
            <td><Sparkline data={plot} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TimeSeriesPlotLegend.propTypes = {
  locationTimeSeriesPlotlyData: PropTypes.object,
  plotName: PropTypes.string.isRequired,
  setPlotName: PropTypes.func.isRequired,
};

export default TimeSeriesPlotLegend;
