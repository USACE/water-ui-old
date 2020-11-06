import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export const  LOCATION_FORMAT_PARAM_OBJECT = " LOCATION_FORMAT_PARAM_OBJECT";

export default createRestBundle({
  name: "locationParams",
  uid: null,
  prefetch: true,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl("http://cwms-data.usace.army.mil/cwms-data/parameters?format=json", "/radar-params.json"),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  urlParamSelectors: [],
  defaultState: {
    formatted_param_obj: null
  },
  reduceFurther: ( state, { type, payload } ) => {
    switch( type ) {
      case  LOCATION_FORMAT_PARAM_OBJECT:
        return Object.assign( {}, state, payload );
      default:
        return state;
    }
  },
  addons: {
    selectLocationParams: createSelector(
      "selectLocationParamsData",
      (data) => {
        if (data && data.parameters) {
          return data.parameters.parameters;
        }
      }
    ),
    selectLocationParamObj: ( { locationParams } ) => {
      return locationParams.formatted_param_obj;
    }, 
    doLocationFormattedParamObj: (data) => ({
      type: LOCATION_FORMAT_PARAM_OBJECT,
      payload: {
        formatted_param_obj: structureParamsData(data)
      },
    }),
  },
});

//returns an obj where the key is the name and the value is the object
// '%-Moisture-Soil-20': {
//   'abstract-param': 'None',
//   name: '%-Moisture-Soil-20',
//   office: 'MVP',
//   'default-english-unit': '%',
//   'default-si-unit': '%',
//   'long-name': 'Percent',
//   description: 'Ratio expressed as hundredths-Moisture-Soil-20'
// }
const structureParamsData = (arr) => {
  const results = {};
  arr.map((item) => {
    results[item.name] = item;
  });
  return results;
};

const formatTimeSeries = (rawName, dictionary) => {
  let formatedName = rawName.split(".");
  const result = [];
  //regex to see if string contains both numbers and letters
  const rx = /([0-9].*[a-z])|([a-z].*[0-9])/;

  formatedName.shift();
  for (let i = 0; i < formatedName.length; i++) {
    let paramName = dictionary[formatedName[i]];
    if (paramName) {
      result.push(paramName["long-name"]);
    } else if (rx.test(formatedName[i])) {
      result.push(formatedName[i].replace(/[a-z](?=\d)|\d(?=[a-z])/gi, "$& "));
    } else if (formatedName[i].length > 4) {
      result.push(formatedName[i]);
    }
  }
  return result.join(" ");
};
