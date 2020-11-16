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
  fetchActions: ["LOCATIONDETAIL_FETCH_FINISHED"],
  forceFetchActions: [],
  urlParamSelectors: ["selectLocationParams"],
  addons: {
    selectLocationParams: createSelector(
      "selectLocationParamsData",
      (locationParamsData) => {
        if (!locationParamsData) return null;
          return arrayToObj(locationParamsData.parameters.parameters, "name");
      }
    ),
  },
});
