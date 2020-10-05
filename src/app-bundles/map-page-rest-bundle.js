import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle( {
  name: "mapLocations",
  uid: "location_code",
  prefetch: true,
  staleAfter: 10000,
  persist: false,
  //routeParam: "",
  getTemplate: getRestUrl( "/water/map", "/location-list.json",true ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  reduceFurther: ( state, { type, payload } ) => {
    switch( type ) {
      case "SET_SELECTED_LOCATION_ID":
        return Object.assign( {}, state, payload );
      default:
        return state;
    }
  },
  addons: {
     selectMapLocations: createSelector(
      "selectMapLocationsItems",
     (mapLocations) => {
        // const data =  [...mapLocations]
        // console.log("map data: ",data);
        return mapLocations;
      }
    ),
    // selectMapLocations: createSelector(
    //   "selectMapLocationsItem",
    //   "mapLocations",
    //   ( selectedLocation, mapLocations) => {
    //     if( !selectedLocation ) return mapLocations;
    //     // const result = mapLocations.filter( entry => entry.location_id === selectedLocation )
    //     // return result.sort( ( a, b ) => ( a.public_name > b.public_name ) ? 1 : -1 );
    //   }
    // ),
    // doSetSelectedLocations: ( id ) => ( { dispatch } ) => {
    //   dispatch( {
    //     type: "SET_SELECTED_LOCATION_ID",
    //     payload: {
    //       _location_id: id,
    //     },
    //   } );
    // },
    // selectSelectedLocation: ( state ) => {
    //   return state.mapLocations._location_id;
    // },
  },
} );
