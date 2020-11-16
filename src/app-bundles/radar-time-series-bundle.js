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
        locationTimeSeries.forEach((timeSeries) => {
          if (timeSeries["regular-interval-values"]) {
            getRegularIntervalValuesData(plotlyData, timeSeries, locationParams);
          } else if (timeSeries["irregular-interval-values"]) {
            getIrregularIntervalValuesData(plotlyData, timeSeries, locationParams);
          }
        });
        return plotlyData;
      }
    ),
  }
} );

// helper function that appends the regular-interval-values data to the plotlyData array
const getRegularIntervalValuesData = (plotlyData, timeSeries, locationParams) => {
  const segments = timeSeries["regular-interval-values"].segments;
  if (segments && segments.length > 0) {
    const interval = timeSeries["regular-interval-values"].interval;
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
      name: getPlotName(timeSeries, locationParams),
      x: xData,
      y: yData,
      unit: timeSeries["regular-interval-values"].unit,
    });
  }
};

// helper function that appends the irregular-interval-values data to the plotlyData array
const getIrregularIntervalValuesData = (plotlyData, timeSeries, locationParams) => {
  const values = timeSeries["irregular-interval-values"].values;
  if (values && values.length > 0) {
    // create array of all the x and y coordinates for plotly
    const xData = [];
    const yData = [];
    values.forEach(([x, y]) => {
      xData.push(x);
      yData.push(y);
    });

    plotlyData.push({
      name: getPlotName(timeSeries, locationParams),
      x: xData,
      y: yData,
      unit: timeSeries["irregular-interval-values"].unit,
    });
  }
};

const getPlotName = (timeSeries, locationParams) => {
  const useNameParser = false;
  if( useNameParser ) return formatTimeSeriesName( timeSeries.name, locationParams );

  // if there are no alternate names, then simply use the plot's given name
  if (!timeSeries["alternate-names"] || timeSeries["alternate-names"].length === 0) {
    return timeSeries.name;
  }

  // use the shortest name as the plot's name
  let name = timeSeries.name;
  timeSeries["alternate-names"].forEach((alternateName) => {
    if (alternateName.length < name.length) {
      name = alternateName;
    }
  })
  return name;
};

const formatTimeSeriesName = (rawName, dictionary) => {
  let formattedName = rawName.split(".");
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

  for (let i = 1; i < formattedName.length; i++) {
    let paramName = dictionary[formattedName[i]];

    if (paramName) {
      result.push(paramName["long-name"]);
    } else if (alphaNumericCheck.test(formattedName[i]) && unitsOfTimeCheck(formattedName[i])) {
      result.push(formattedName[i].replace(/[a-z](?=\d)|\d(?=[a-z])/gi, "$& "));
    } else if ( i === formattedName.length -  1 ) {
      result.push(formattedName[i]);
    }
  }
  return result.join(" ");
};
