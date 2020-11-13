import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

const name = "streamLocation";
export default createRestBundle( {
  name,
  uid: "location_code",
  staleAfter: 0,
  persist: false,
  routeParam: "locationId",
  getTemplate: getRestUrl( "/water/locations/streams/:location_code", "/stream-locations.json" ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  forceFetchActions: [],
  urlParamSelectors: [],
  defaultState: {
    data: {},
    location_code: null,
  },
  addons: {

  }
} );
