import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

const LOCATION_DETAIL_SET_LOCATION_CODE = "LOCATION_DETAIL_SET_LOCATION_CODE";

const name = "locationDetail";
export default createRestBundle( {
  name,
  uid: "location_code",
  staleAfter: 0,
  persist: false,
  routeParam: "locationId",
  getTemplate: getRestUrl( "/water/locations/:location_code", "/location-detail.json?/:location_code", true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  forceFetchActions: [],
  urlParamSelectors: [ "selectLocationDetailGetTemplateParam" ],
  defaultState: {
    data: {},
    location_code: null,
  },
  reduceFurther: ( state, { type, payload } ) => {
    switch( type ) {
      case LOCATION_DETAIL_SET_LOCATION_CODE:
        return Object.assign( {}, state, payload );
      default:
        return state;
    }
  },
  addons: {
    doLocationDetailSetCode: id => ({
      type: LOCATION_DETAIL_SET_LOCATION_CODE,
      payload: {
        location_code: id,
        _shouldFetch: true,
      },
    }),
    selectLocationDetailCode: state => state[name].location_code,
    selectLocationDetailGetTemplateParam: createSelector(
      "selectLocationDetailCode",
      locationDetailCode => !locationDetailCode ? {} : { location_code: locationDetailCode },
    ),

  }
} )
