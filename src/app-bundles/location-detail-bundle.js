import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";
import { match } from "assert";

export default createRestBundle( {
  name: "locationDetails",
  uid: "location_id",
  //prefetch: true, //cant be fetched until location_id loaded in state
  staleAfter: 10000,
  persist: false,
  //routeParam: "districtsAndBasinsSlug",
  getTemplate: getRestUrl( "/water/locations", "/location-detail.json" ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  addons: {
    selectLocation: createSelector(
      "selectLocationDetails",
      ( locationDetails ) => {
        const matchedLocationId = "";
        const result = locationDetails.filter( entry => {
          if( matchedLocationId.equals(entry.location_id)) return false;
          matchedLocationId = entry.location_id;
          return true;
        });
        return result;
      }
    ),

  }
})
