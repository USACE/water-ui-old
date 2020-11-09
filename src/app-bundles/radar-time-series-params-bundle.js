import createRestBundle from "./create-rest-bundle";
import { getRestUrl, arrayToObj } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "locationParams",
  uid: null,
  prefetch: false,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl("https://cwms-data.usace.army.mil/cwms-data/parameters?format=json", "/radar-params.json"),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  forceFetchActions: [],
  addons: {
    reactLocationParamsFormatData: createSelector(
      "selectLocationParamsData",
      (locationParamsData) => {
        if (locationParamsData && locationParamsData.parameters && locationParamsData.parameters.parameters) {
          return {
            actionCreator: "doLocationParamsFormatData",
            args: [locationParamsData.parameters.parameters],
          };
        }
      }
    ),
    doLocationParamsFormatData: (parameters) => {
      const parametersByName = arrayToObj(parameters, "name");
      return {
        type: "LOCATIONPARAMS_UPDATED_ITEM",
        payload: {
          data: parametersByName,
        },
      };
    },
  },
});
