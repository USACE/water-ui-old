import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle( {
  name: "locationDetail",
  uid: "location_code",
  staleAfter: 0,
  persist: true,
  getTemplate: getRestUrl( "/water/locations/:location_code", "/location-detail.json?/:location_code", true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [ "LOCATION_CODE_SELECTED" ],
  forceFetchActions: [],
  urlParamSelectors: [ "selectLocationAsGetTemplateParam" ],
  reduceFurther: ( state, { type, payload } ) => {
    switch( type ) {
      case "SET_SELECTED_LOCATION_CODE":
      case "LOCATION_CODE_SELECTED":
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
    selectSelectedLocationCode: ( state ) => {
      return state.locationDetail._location_code;
    },
    selectSelectedLocationDetail: createSelector(
      "selectLocationDetailItems",
      ( locationDetailItems ) => {
        if( locationDetailItems[ 0 ] ) return locationDetailItems[ 0 ];
        else return {};
      }
    ),
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
