import { createSelector } from "redux-bundler";
import createRestBundle from "./create-rest-bundle";
import { getRestUrl, getIntervalTime } from "./bundle-utils";

export default createRestBundle( {
  name: "locationTimeSeries",
  uid: null,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl(
    "https://cwms-data.usace.army.mil/cwms-data/timeseries?office=:office_id&name=:location_id.*&format=json",
    "/radar-time-series.json?office=:office_id&name=:location_id.*&format=json" ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [ "LOCATIONDETAIL_FETCH_FINISHED" ],
  forceFetchActions: [],
  urlParamSelectors: [ "selectLocationTimeSeriesUrlParams" ],
  addons: {
    selectLocationTimeSeries: createSelector(
      "selectLocationTimeSeriesData",
      locationTimeSeriesData => locationTimeSeriesData && locationTimeSeriesData["time-series"] && locationTimeSeriesData["time-series"]["time-series"],
    ),
    selectLocationTimeSeriesUrlParams: createSelector(
      "selectLocationDetailData",
      ( locationDetailData ) => {
        if( !locationDetailData ) return {};
        return {
          location_id: locationDetailData.location_id,
          office_id: locationDetailData.office_id
        }
      }
    ),
    selectLocationTimeSeriesPlotlyData: createSelector(
      "selectLocationTimeSeriesData",
      (locationTimeSeriesData) => {
        if (!locationTimeSeriesData || !locationTimeSeriesData["time-series"] || !locationTimeSeriesData["time-series"]["time-series"]) {
          return [];
        }

        const plotlyData = [];
        const locationTimeSeries = locationTimeSeriesData["time-series"]["time-series"];

        locationTimeSeries.forEach((element) => {
          const segments = element["regular-interval-values"] && element["regular-interval-values"].segments;
          if (segments && segments.length > 0) {
            const interval = element["regular-interval-values"].interval;
            const segment = segments[0];
            const startTime = new Date(segment["first-time"]);
            const intervalLength = getIntervalTime(interval);

            // create array of all the x and y coordinates for plotly
            const xData = [];
            const yData = [];
            segment.values.forEach(([y], index) => {
              const xTime = startTime.getTime() + (intervalLength * index);
              const x = new Date(xTime);
              xData.push(x);
              yData.push(y);
            });

            plotlyData.push({
              name: element.name,
              x: xData,
              y: yData,
              unit: element["regular-interval-values"].unit,
            });
          }
        });
        return plotlyData;
      }
    ),
  }
} )
