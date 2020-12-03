import { createSelector } from "redux-bundler";
import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { getIntervalTime, TIME, dateToString, arrayToObj } from "../utils";

export const radarTimeControls = [
  { value: TIME.DAY, label: "Past 24 hours" },
  { value: TIME.WEEK, label: "Past 7 days" },
  { value: TIME.MONTH, label: "Past 30 days" },
  { value: TIME.YEAR, label: "Past 365 days" },
  { value: -1, label: "Custom range" },
];

const name = "locationTimeSeries";

const LOCATIONTIMESERIES_FETCH_NEW_DATA = "LOCATIONTIMESERIES_FETCH_NEW_DATA";

export default createRestBundle( {
  name,
  uid: null,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl(
    "https://cwms-data.usace.army.mil/cwms-data/timeseries?office=:office_id&name=:location_id.*&begin=:startDate&end=:endDate&format=json",
    "/radar-time-series.json?office=:office_id&name=:location_id.*&begin=:startDate&end=:endDate&format=json" ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [ "LOCATIONDETAIL_FETCH_FINISHED", LOCATIONTIMESERIES_FETCH_NEW_DATA ],
  forceFetchActions: [],
  urlParamSelectors: [ "selectLocationTimeSeriesUrlParams" ],
  defaultState: {
    timeControl: TIME.WEEK, // default time control range

    // the custom start and end dates if the user selects a custom range, they will be in the format yyyy-mm-dd
    customStartDate: "",
    customEndDate: "",
  },
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case LOCATIONTIMESERIES_FETCH_NEW_DATA:
        return Object.assign({}, state, payload);
      default:
        return state;
    }
  },
  addons: {
    // Lts is short for LocationTimeSeries
    selectLtsTimeControl: state => state[name].timeControl,
    selectLtsCustomStartDate: state => state[name].customStartDate,
    selectLtsCustomEndDate: state => state[name].customEndDate,

    doLtsSetTimeControl: (timeControl) => ({ dispatch, store }) => {
      dispatch({
        type: "LOCATIONTIMESERIES_UPDATED_ITEM",
        payload: {
          timeControl
        },
      });

      const customStartDate = store.selectLtsCustomStartDate();
      const customEndDate = store.selectLtsCustomEndDate();

      // get new time series data. If timeControl is a custom date, then make sure both the customStartDate and customEndDate exist before making the fetch call
      if (timeControl > 0 || validateStartEndDates(customStartDate, customEndDate)) {
        dispatch({ type: LOCATIONTIMESERIES_FETCH_NEW_DATA });
      }
    },
    doLtsSetCustomDate: (name, date) => ({ dispatch, store }) => {
      dispatch({
        type: "LOCATIONTIMESERIES_UPDATED_ITEM",
        payload: {
          [name]: date,
        },
      });

      const customStartDate = store.selectLtsCustomStartDate();
      const customEndDate = store.selectLtsCustomEndDate();

      // check that both the custom start and end dates exist before making the fetch call
      if (validateStartEndDates(customStartDate, customEndDate)) {
        dispatch({ type: LOCATIONTIMESERIES_FETCH_NEW_DATA });
      }
    },

    selectLocationTimeSeriesUrlParams: createSelector(
      "selectLocationDetailData",
      "selectLtsTimeControl",
      "selectLtsCustomStartDate",
      "selectLtsCustomEndDate",
      ( locationDetailData, timeControl, customStartDate, customEndDate ) => {
        if( !locationDetailData ) return {};

        const urlParams = {
          location_id: locationDetailData.location_id,
          office_id: locationDetailData.office_id
        };

        if (timeControl > 0) {
          // calculate the start and end dates if the user selects one of the predefined time controls
          const today = new Date();
          const startTime = today.getTime() - timeControl;
          urlParams.startDate = dateToString(new Date(startTime));
          urlParams.endDate = dateToString(today);
        } else {
          // use the custom date range that the user selected
          urlParams.startDate = customStartDate;
          urlParams.endDate = customEndDate;
        }
        return urlParams;
      }
    ),

    selectLocationTimeSeriesPlotlyData: createSelector(
      "selectLocationTimeSeriesData",
      (locationTimeSeriesData) => {
        if (!locationTimeSeriesData || !locationTimeSeriesData["time-series"] || !locationTimeSeriesData["time-series"]["time-series"]) {
          return [];
        }

        const plotlyArray = [];
        const locationTimeSeries = locationTimeSeriesData["time-series"]["time-series"];
        locationTimeSeries.forEach((timeSeries) => {
          if (timeSeries["regular-interval-values"]) {
            getRegularIntervalValuesData(plotlyArray, timeSeries);
          } else if (timeSeries["irregular-interval-values"]) {
            getIrregularIntervalValuesData(plotlyArray, timeSeries);
          }
        });
        plotlyArray.sort((a, b) => a.sortIndex - b.sortIndex);
        const plotlyObj = arrayToObj(plotlyArray, "name");
        return plotlyObj;
      }
    ),
  }
} );

/**
 * returns true if the start and end dates are valid, meaning they exist and they start date
 * comes before the end date
 *
 * @param {String} startDate
 * @param {String} endDate
 */
const validateStartEndDates = (startDate, endDate) => {
  const validDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (
    startDate && endDate && // check start and end dates exist
    validDateRegex.test(startDate) && validDateRegex.test(endDate) && // check the dates are in the format yyyy-mm-dd
    new Date(startDate).getTime() < new Date(endDate).getTime() // check that start date comes before end date
  ) {
    return true;
  }
  return false;
}

const getSortIndex = (name) => {
  const lowerCaseName = name.toLowerCase();
  if ( lowerCaseName.includes( "elev" ) ) {
    return 0;
  } else if ( lowerCaseName.includes( "flow" ) ) {
    return 1;
  } else if ( lowerCaseName.includes( "stage" ) ) {
    return 2;
  } else if ( lowerCaseName.includes( "temp" ) ) {
    return 3;
  } else {
    return Infinity;
  }
};

// helper function that appends the regular-interval-values data to the plotlyData array
const getRegularIntervalValuesData = (plotlyData, timeSeries) => {
  const segments = timeSeries["regular-interval-values"].segments;
  if (segments && segments.length > 0) {
    const interval = timeSeries["regular-interval-values"].interval;
    
    // create array of all the x and y coordinates for plotly
    const xData = [];
    const yData = [];
    segments.forEach((segment) => {
      const startTime = new Date(segment["first-time"]);
      const intervalLength = getIntervalTime(interval);
  
      segment.values.forEach(([y], index) => {
        const xTime = startTime.getTime() + (intervalLength * index);
        const x = new Date(xTime);
        xData.push(x);
        yData.push(y);
      });
    });

    const name = getPlotName(timeSeries);
    const sortIndex = getSortIndex(name);
    plotlyData.push({
      name,
      sortIndex,
      x: xData,
      y: yData,
      unit: timeSeries["regular-interval-values"].unit,
    });
  }
};

// helper function that appends the irregular-interval-values data to the plotlyData array
const getIrregularIntervalValuesData = (plotlyData, timeSeries) => {
  const values = timeSeries["irregular-interval-values"].values;
  if (values && values.length > 0) {
    // create array of all the x and y coordinates for plotly
    const xData = [];
    const yData = [];
    values.forEach(([x, y]) => {
      xData.push(x);
      yData.push(y);
    });

    const name = getPlotName(timeSeries);
    const sortIndex = getSortIndex(name);
    plotlyData.push({
      name,
      sortIndex,
      x: xData,
      y: yData,
      unit: timeSeries["irregular-interval-values"].unit,
    });
  }
};

const getPlotName = (timeSeries) => {
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

// const formatTimeSeriesName = (rawName, dictionary) => {
//   let formattedName = rawName.split(".");
//   const result = [];
//   //regex to see if string contains both numbers and letters
//   const alphaNumericCheck = /([0-9].*[a-z])|([a-z].*[0-9])/;
//   // func to check if text is unit of time.
//   const unitsOfTimeCheck = (str) => {
//     const unitsOfTime = ["seconds","minutes","hours","days","months","weeks","years"];
//     // split num and letters 
//     const timeParams = str.toLowerCase().match(/[a-zA-Z]+|[0-9]+/g)[1];
//     for( let i = 0; i < unitsOfTime.length; i++ ){
//       if( unitsOfTime[i].includes(timeParams) ){
//         return true;
//       }
//     }
//   };

//   for (let i = 1; i < formattedName.length; i++) {
//     let paramName = dictionary[formattedName[i]];

//     if (paramName) {
//       result.push(paramName["long-name"]);
//     } else if (alphaNumericCheck.test(formattedName[i]) && unitsOfTimeCheck(formattedName[i])) {
//       result.push(formattedName[i].replace(/[a-z](?=\d)|\d(?=[a-z])/gi, "$& "));
//     } else if ( i === formattedName.length -  1 ) {
//       result.push(formattedName[i]);
//     }
//   }
//   return result.join(" ");
// };
