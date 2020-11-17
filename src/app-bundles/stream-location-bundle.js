import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";
import { LOCATIONDETAIL_SET_CODE } from "./location-detail-bundle";

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
  reduceFurther: ( state, { type } ) => {
    switch( type ) {
      case LOCATIONDETAIL_SET_CODE:
      case "STREAMLOCATIONS_FETCH_STARTED":
      case "STREAMLOCATIONS_ERROR":
        // Clear out old stream locations
        return Object.assign( {}, state, { data: [] } );
      default:
        return state;
    }
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
