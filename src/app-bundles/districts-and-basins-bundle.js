import createRestBundle from "./create-rest-bundle";
import { isMockMode } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "districtsAndBasins",
  uid: "BasinLocationCode",
  prefetch: true,
  staleAfter: 10000,
  persist: false,
  //routeParam: "districtsAndBasinsSlug",
  getTemplate: isMockMode() ? "/districts-and-basins.json" : "/api/districts-and-basins",
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  addons: {
    selectDistricts: createSelector(
      "selectDistrictsAndBasinsItems",
      (districtsAndBasins) => {
        // TODO: We could add lodash which has array unique function as well as many other utility functions?
        const matchedDistrictIds = {};
        const result = districtsAndBasins.filter(entry => {
          if (matchedDistrictIds[entry.OfficeId]) return false;
          matchedDistrictIds[entry.OfficeId] = true;
          return true;
        });
        console.log( "distrincts in selector?", result );
        return result;
      }
    ),
    selectBasinsForDistrict: createSelector(
      "selectDistrictsAndBasinsItems",
      (districtsAndBasins) => {
        const selectedDistrict = "SPA";
        if(!selectedDistrict) return districtsAndBasins;
        const result = districtsAndBasins.filter(entry => entry.OfficeId === selectedDistrict)
        console.log( "basins for district in selector?", result );
        return result;
      }
    ),
  },
});
