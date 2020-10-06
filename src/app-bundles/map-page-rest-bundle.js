import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "mapLocations",
  uid: "location_code",
  prefetch: true,
  staleAfter: 10000,
  persist: false,
  //routeParam: "",
  getTemplate: getRestUrl("/water/locations", "/location-list.json"),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case "SET_SELECTED_LOCATION_ID":
        return Object.assign({}, state, payload);
      default:
        return state;
    }
  },
  addons: {
    selectMapLocations: createSelector(
      "selectMapLocationsItems",
      (mapLocations) => {
        return mapLocations;
      }
    ),
    selectIsLocationsMapInitialized: (state) => {
      return state.maps.isLocationsMapInitialized;
    },
    reactShouldCreateMap: createSelector(
      "selectIsLocationsMapInitialized",
      "selectMapLocationsItems",
      (isMapInitialized, mapLocationItems) => {
        if (isMapInitialized && mapLocationItems.length > 0) {
          return { actionCreator: "doAddDataToMap" };
        }
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
  },
});
