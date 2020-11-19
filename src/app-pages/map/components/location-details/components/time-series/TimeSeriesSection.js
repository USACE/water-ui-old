import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Loader from "../../../../../../app-common/loader/Loader";
import A2WPlot from "../../../../../../app-common/plotly/A2Wplot";
import TimeSeriesControl from "./TimeSeriesControl";
import TimeSeriesTable from "./TimeSeriesTable";

const TimeSeriesSection = ({
  locationTimeSeriesPlotlyData,
  locationTimeSeriesIsLoading,
}) => {
  const [plotIndex, setPlotIndex] = useState(0);

  // reset the plotIndex when the plotly data changes
  useEffect(() => {
    setPlotIndex(0);
  }, [locationTimeSeriesPlotlyData, setPlotIndex]);

  const sortTimeSeriesData = ( data ) => {
    const returnSortOrder = ( data ) => {
      const name = data.name.toLowerCase();
      if ( name.includes( "elev" ) ) {
        return "0";
      } else if ( name.includes( "flow" ) ) {
        return "1";
      } else if ( name.includes( "stage" ) ) {
        return "2";
      } else if ( name.includes( "temp" ) ) {
        return "3";
      } else {
        return Infinity;
      }
    };
    return data.sort(( a, b ) => returnSortOrder( a ) - returnSortOrder( b ));
  };

  const data = locationTimeSeriesPlotlyData && sortTimeSeriesData(locationTimeSeriesPlotlyData).map(plotlyData => ({
    ...plotlyData,
    type: "scatter",
    mode: "lines",
  }));

  if (data.length === 0 || !data[plotIndex]) {
    return null;
  }

  const layout = {
    autosize: true,
    margin: { t: 70, b: 50, l: 70, r: 70 },
    title: data[plotIndex].name,
    yaxis: {
      title: data[plotIndex].unit,
    },
  };

  const config = {
    scrollZoom: true,
  }

  return (
    <div className="time-series-section">
      { locationTimeSeriesIsLoading && <Loader /> }
      <div className="time-series-plot">
        <A2WPlot
          data={[ data[plotIndex] ]}
          layout={layout}
          config={config}
          useResizeHandler={ true }
        />
        <TimeSeriesControl />
      </div>
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
  locationTimeSeriesIsLoading: PropTypes.bool.isRequired,
};

export default connect(
  "selectLocationTimeSeriesPlotlyData",
  "selectLocationTimeSeriesIsLoading",
  TimeSeriesSection
);
