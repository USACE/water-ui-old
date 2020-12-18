import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle( {
  name: "locationDetail",
  getTemplate: getRestUrl( "/water/locations/details/:location_code", "/location-detail.json?/:location_code" ),
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
