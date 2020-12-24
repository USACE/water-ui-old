import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "cwmsStreams",
  prefetch: false,
  staleAfter: 0,
  persist: false,
  getTemplate: getRestUrl("/water/locations/stream-locations/:stream_location_code", "/stream-locations.json?/:stream_location_code"),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  forceFetchActions: [],
  urlParamSelectors: [ "selectCwmsStreamsUrlParams" ],
  defaultState: {
    data: [],
  },
  addons: {
    selectCwmsStreamsUrlParams: createSelector(
      "selectCwmsDetailData",
      cwmsDetail => cwmsDetail && cwmsDetail.stream_location_code
        ? { stream_location_code: cwmsDetail.stream_location_code }
        : {},
    ),
  },
});
