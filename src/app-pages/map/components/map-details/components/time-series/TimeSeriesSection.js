import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "redux-bundler-react";
import Loader from "../../../../../../app-common/loader/Loader";
import TimeSeriesDateRange from "./TimeSeriesDateRange";
import TimeSeriesPlot from "./TimeSeriesPlot";
import TimeSeriesPlotLegend from "./TimeSeriesPlotLegend";

export const TimeSeriesSection = ({
  queryObject,
  locationTimeSeriesPlotlyData,
  locationTimeSeriesIsLoading,
}) => {
  // stores the selected plot's name
  const [plotName, setPlotName] = useState("");

  useEffect(() => {
    // if the plotly data changes and the selected location does not exist in the new
    // plotly data, then reset the selected location
    if (!locationTimeSeriesPlotlyData[plotName] && Object.keys(locationTimeSeriesPlotlyData).length > 0) {
      const firstPlot = Object.keys(locationTimeSeriesPlotlyData)[0];
      setPlotName(firstPlot);
    }
  }, [locationTimeSeriesPlotlyData, plotName, setPlotName]);

  const sectionCSSClasses = `time-series-section ${ queryObject.display }`
  const loaderStyle = { zIndex: 10 };
  return (
    <div className="time-series-container">
      { locationTimeSeriesIsLoading && <Loader style={loaderStyle} /> }
      <div className={ sectionCSSClasses }>
        <div className="time-series-plot">
          <TimeSeriesPlot
            locationTimeSeriesPlotlyData={locationTimeSeriesPlotlyData}
            plotName={plotName}
            plotHeight={( queryObject.display === "fs" ? 450 : 300 )}
          />
          <TimeSeriesDateRange />
        </div>
        <TimeSeriesPlotLegend
          locationTimeSeriesPlotlyData={locationTimeSeriesPlotlyData}
          plotName={plotName}
          setPlotName={setPlotName}
        />
      </div>
    </div>
  );
};

TimeSeriesSection.propTypes = {
  queryObject: PropTypes.object.isRequired,
  locationTimeSeriesPlotlyData: PropTypes.object.isRequired,
  locationTimeSeriesIsLoading: PropTypes.bool.isRequired,
};

export default connect(
  "selectQueryObject",
  "selectLocationTimeSeriesPlotlyData",
  "selectLocationTimeSeriesIsLoading",
  TimeSeriesSection
);
