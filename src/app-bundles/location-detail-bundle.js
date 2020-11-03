import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export const LOCATIONDETAIL_SET_CODE = "LOCATIONDETAIL_SET_CODE";

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
    location_code: null,
  },
  reduceFurther: ( state, { type, payload } ) => {
    switch( type ) {
      case LOCATIONDETAIL_SET_CODE:
        return Object.assign( {}, state, payload );
      default:
        return state;
    }
  },
  addons: {
    doLocationDetailSetCode: id => ({
      type: LOCATIONDETAIL_SET_CODE,
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

    reactShouldSetLocationCode: createSelector(
      "selectRouteParams",
      "selectLocationDetailCode",
      ( routeParams, selectedLocationCode ) => {
        if( routeParams.locationId && !selectedLocationCode ) {
          return { actionCreator: "doLocationDetailSetCode", args: [ routeParams.locationId ] };
        }
      }
    ),

  }
} )
