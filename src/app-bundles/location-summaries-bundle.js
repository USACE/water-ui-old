import createRestBundle from "./create-rest-bundle";
import { getRestUrl, isMockMode, arrayToObj } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle( {
  name: "locationSummaries",
  uid: "id",
  prefetch: true,
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
    selectLocationSummaries: createSelector(
      "selectLocationSummariesData",
      data => data ? Object.keys(data).map(key => data[key]) : [],
    )
  },
} );
