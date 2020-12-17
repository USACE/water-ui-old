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

  const handleOnKeyDown = (e, plotName) => {
    if (e.key === "Enter") {
      setPlotName(plotName);
    }
  };

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
            tabIndex="0"
            onClick={() => setPlotName(plot.name)}
            onKeyDown={e => handleOnKeyDown(e, plot.name)}
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
