import { createSelector } from "redux-bundler";
import createRestBundle from "./create-rest-bundle";
import { getRestUrl, isMockMode } from "./bundle-utils";
import { arrayToObj } from "../utils";
import { RoutePaths } from "./route-paths";

export default createRestBundle( {
  name: "locationSummaries",
  uid: "id",
  prefetch: false,
  staleAfter: 10000,
  persist: false,
  getTemplate: getRestUrl( "/water/locations", "/location-list.json" ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  delayMs: isMockMode() ? 2000 : 0,
  addons: {
    // make fetch call to get the location summaries data if on the map page and location summaries has not already been loaded
    reactLocationSummariesFetch: createSelector(
      "selectPathname",
      "selectLocationSummariesData",
      "selectLocationSummariesIsLoading",
      (pathname, data, isLoading) => {
        if (pathname === RoutePaths.Map && !data && !isLoading) {
          return { actionCreator: "doLocationSummariesFetch" };
        }
      },
    ),

    // reformat the location summaries data into an object to quickly look up location info via the location id 
    reactLocationSummariesFormatData: createSelector(
      "selectLocationSummariesData",
      (data) => {
        if (data && Array.isArray(data)) {
          return {
            actionCreator: "doLocationSummariesFormatData",
            args: [data],
          };
        }
      }
    ),
    doLocationSummariesFormatData: (data) => {
      const dataById = arrayToObj(data, "id");
      return {
        type: "LOCATIONSUMMARIES_UPDATED_ITEM",
        payload: {
          data: dataById,
        }
      };
    },

    // return an array of all the location summaries
    selectLocationSummaries: createSelector(
      "selectLocationSummariesData",
      data => data ? Object.keys(data).map(key => data[key]) : [],
    ),
  },
} );
