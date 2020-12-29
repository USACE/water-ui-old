import { createSelector } from "redux-bundler";
import createRestBundle from "../../create-rest-bundle";
import { getRestUrl } from "../../bundle-utils";

export default createRestBundle( {
  name: "cwmsDetail",
  getTemplate: getRestUrl( "/water/cwms/:location_code/detail", "/location-detail.json?/:location_code" ),
  urlParamSelectors: [ "selectCwmsDetailGetTemplateParam" ],
  defaultState: {
    data: {},
  },
  addons: {
    selectCwmsDetailGetTemplateParam: createSelector(
      "selectQueryObject",
      ({ id }) => id ? { location_code: id } : {},
    ),
  }
} );
