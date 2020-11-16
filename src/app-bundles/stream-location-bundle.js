import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "streamLocations",
  prefetch: false,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl("/water/locations/stream-locations/:location_code", "/stream-locations.json?/:location_code"),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  forceFetchActions: [],
  urlParamSelectors: [ "selectStreamLocationsUrlParams" ],
  defaultState: {
    data: [],
  },
  addons: {
    selectStreamLocationsUrlParams: createSelector(
      "selectLocationDetailCode",
      locationDetailCode => locationDetailCode ? { location_code: locationDetailCode } : {},
    ),
  },
});
