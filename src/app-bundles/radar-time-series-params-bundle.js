import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export const  LOCATION_FORMAT_PARAM_OBJECT = " LOCATION_FORMAT_PARAM_OBJECT";

export default createRestBundle({
  name: "locationParams",
  uid: null,
  prefetch: false,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl("http://cwms-data.usace.army.mil/cwms-data/parameters?format=json", "/radar-params.json"),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: ["LOCATIONTIMESERIES_FETCH_FINISHED"],
  forceFetchActions: [],
  urlParamSelectors: ["selectLocationParams"],
  addons: {
    selectLocationParams: createSelector(
      "selectLocationParamsData",
      (locationParamsData) => {
        if (!locationParamsData) return null;
          return structureParamsData(locationParamsData.parameters.parameters);
      }
    ),
  },
});

//returns an obj where the key is the name and the value is the object
const structureParamsData = (arr) => {
  const results = {};
  arr.map((item) => {
    results[item.name] = item;
  });
  return results;
};

