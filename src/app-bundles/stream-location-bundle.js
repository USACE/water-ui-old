import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export const LOCATIONSTREAM_SET_STREAM = "LOCATIONSTREAM_SET_STREAM";

const name = "streamLocations";

export default createRestBundle({
  name,
  uid: "location_code",
  prefetch: false,
  staleAfter: 0,
  persist: false,
  routeParam: "locationId",
  getTemplate: getRestUrl("/water/locations/streams/:location_code", "/stream-locations.json"),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  forceFetchActions: [],
  urlParamSelectors: [],
  defaultState: {
    data: [],
    location_code: null,
    current_index: null,
  },
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case LOCATIONSTREAM_SET_STREAM:
        return Object.assign({}, state, payload);
      default:
        return state;
    }
  },
  addons: {
    selectStreamLocations: createSelector(
      "selectStreamLocationsData",
      "selectLocationCode",
      (data, selectedLocationCode) => {
        if (!data) return [];
        return {
          data: data,
          current_index: Array.isArray(data) && data.findIndex((obj) => obj.location_code === selectedLocationCode),
        };
      }
    ),

    selectLocationCode: (state) => state[name].location_code,

    doSelectStreamLocation: (location_code) => {
      return {
        type: "LOCATIONSTREAM_SET_STREAM",
        payload: {
          location_code: location_code,
          _shouldFetch: true,
        },
      };
    },
  },
});
