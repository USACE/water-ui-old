import { createSelector } from "redux-bundler";
import createRestBundle from "../create-rest-bundle";
import { getRestUrl } from "../bundle-utils";
import { RoutePaths } from "../route-paths";
import { arrayToObj } from "../../utils";

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
    selectLocationParams: createSelector(
      "selectLocationParamsData",
      (locationParamsData) => {
        if (!locationParamsData) return null;
          return arrayToObj(locationParamsData.parameters.parameters, "name");
      }
    ),
    // since the location params are the same regardless of the selected location, only fetch the location 
    // params data if the user is on the map page and the location params have not alreaddy been loaded 
    reactShouldFetchLocationParams: createSelector(
      "selectPathname",
      "selectLocationParamsData",
      "selectLocationParamsIsLoading",
      (pathname, data, isLoading) => {
        if (pathname === RoutePaths.Map && !data && !isLoading) {
          return { actionCreator: "doLocationParamsFetch" };
        }
      },
    ),
  },
});

