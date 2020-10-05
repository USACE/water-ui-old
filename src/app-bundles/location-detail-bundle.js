import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle( {
  name: "locationDetail",
  uid: "location_code",
  staleAfter: 10000,
  persist: false,
  getTemplate: getRestUrl( "/water/locations/:location_code", "/location-detail.json?/:location_code", true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [ "LOCATION_CODE_SELECTED" ],
  urlParamSelectors: [ "selectLocationAsGetTemplateParam" ],
  reduceFurther: ( state, { type, payload } ) => {
    switch( type ) {
      case "SET_SELECTED_LOCATION_CODE":
        return Object.assign( {}, state, payload );
      default:
        return state;
    }
  },
  addons: {
    doSetSelectedLocationCode: ( id ) => ( { dispatch } ) => {
      dispatch( {
        type: "SET_SELECTED_LOCATION_CODE",
        payload: {
          _location_code: id,
        },
      } );
      dispatch( {
        type: "LOCATION_CODE_SELECTED",
        payload: {}
      } );
    },
    selectSelectedLocationCode: ( { locationDetail } ) => {
      return locationDetail._location_code;
    },
    selectLocationAsGetTemplateParam: createSelector(
      "selectSelectedLocationCode",
      ( selectedLocationCode ) => {
        if( !selectedLocationCode ) return {};
        return {
          location_code: selectedLocationCode,
        };
      }
    ),

  }
} )
