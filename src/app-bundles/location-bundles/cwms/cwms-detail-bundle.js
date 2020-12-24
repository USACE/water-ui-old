import { createSelector } from "redux-bundler";
import createRestBundle from "../../create-rest-bundle";
import { getRestUrl } from "../../bundle-utils";

export default createRestBundle( {
  name: "cwmsDetail",
  getTemplate: getRestUrl( "/water/locations/details/:location_code", "/location-detail.json?/:location_code" ),
  urlParamSelectors: [ "selectCwmsDetailGetTemplateParam" ],
  defaultState: {
    data: {},
  },
  addons: {
    selectCwmsDetailGetTemplateParam: createSelector(
      "selectQueryObject",
      ({ locationId }) => locationId ? { location_code: locationId } : {},
    ),
  }
} );