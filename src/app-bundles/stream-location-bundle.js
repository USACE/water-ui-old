import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "streamLocations",
  prefetch: false,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl("/water/locations/stream-locations/:stream_location_code", "/stream-locations.json?/:stream_location_code"),
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
      "selectLocationDetailData",
      locationDetail => locationDetail && locationDetail.stream_location_code
        ? { stream_location_code: locationDetail.stream_location_code }
        : {},
    ),
  },
});
