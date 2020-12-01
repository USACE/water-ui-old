import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

const name = "locationDetail";
export default createRestBundle( {
  name,
  uid: "location_code",
  staleAfter: 0,
  persist: false,
  routeParam: "locationId",
  getTemplate: getRestUrl( "/water/locations/details/:location_code", "/location-detail.json?/:location_code" ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  forceFetchActions: [],
  urlParamSelectors: [ "selectLocationDetailGetTemplateParam" ],
  defaultState: {
    data: {},
  },
  addons: {
    selectLocationDetailGetTemplateParam: createSelector(
      "selectQueryObject",
      ({ locationId }) => locationId ? { location_code: locationId } : {},
    ),
  }
} );
