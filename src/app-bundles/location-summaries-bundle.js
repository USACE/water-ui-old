import createRestBundle from "./create-rest-bundle";
import { prodUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "locationSummaries",
  uid: "location_code",
  prefetch: true,
  staleAfter: 10000,
  persist: false,
  //routeParam: "",
  getTemplate: `${ prodUrl }/water/locations`,
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      default:
        return state;
    }
  },
  addons: {
    selectLocationSummaries: createSelector(
      "selectLocationSummariesItems",
      (locationSummaries) => {
        return locationSummaries;
      }
    ),
  },
});
