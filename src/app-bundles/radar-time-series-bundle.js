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
      "selectLocationParams",
      (locationTimeSeriesData, locationParams) => {
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
              name: locationParams ? formatTimeSeriesName( element.name,locationParams ) : element.name,
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
} );

const formatTimeSeriesName = (rawName, dictionary) => {
  let formatedName = rawName.split(".");
  const result = [];
  //regex to see if string contains both numbers and letters
  const alphaNumericCheck = /([0-9].*[a-z])|([a-z].*[0-9])/;
  // func to check if text is unit of time.
  const unitsOfTimeCheck = (str) => {
    const unitsOfTime = ["seconds","minutes","hours","days","months","weeks","years"];
    // split num and letters 
    const timeParams = str.toLowerCase().match(/[a-zA-Z]+|[0-9]+/g)[1];
    for( let i = 0; i < unitsOfTime.length; i++ ){
      if( unitsOfTime[i].includes(timeParams) ){
        return true;
      }
    }
  };

  for (let i = 1; i < formatedName.length; i++) {
    let paramName = dictionary[formatedName[i]];

    if (paramName) {
      result.push(paramName["long-name"]);
    } else if (alphaNumericCheck.test(formatedName[i]) && unitsOfTimeCheck(formatedName[i])) {
      result.push(formatedName[i].replace(/[a-z](?=\d)|\d(?=[a-z])/gi, "$& "));
    } else if ( i === formatedName.length -  1 ) {
      result.push(formatedName[i]);
    }
  }
  return result.join(" ");
};
