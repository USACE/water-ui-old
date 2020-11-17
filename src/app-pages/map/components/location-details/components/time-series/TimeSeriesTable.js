import React from "react";
import PropTypes from "prop-types";
import Sparkline from "../../../../../../app-common/plotly/Sparkline";
import "./time-series.scss";

const TimeSeriesTable = ({
  data,
  plotIndex,
  setPlotIndex,
}) => {

  const handleTableClick = ( event, index ) => {
    event.stopPropagation();
    setPlotIndex( index );
  }

  return (
    <table className="table time-series-table">
      <thead>
        <tr>
          <th>Time Series</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {data.map((element, index) => (
          <tr
            key={element.name}
            className={index === plotIndex ? "time-series-selected-row" : ""}
          >
            <td onClick={( event ) => handleTableClick( event, index )}>{element.name}</td>
            <td onClick={( event ) => handleTableClick( event, index )}><Sparkline data={element} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TimeSeriesTable.propTypes = {
  data: PropTypes.array.isRequired,
  plotIndex: PropTypes.number.isRequired,
  setPlotIndex: PropTypes.func.isRequired,
};

export default TimeSeriesTable;
