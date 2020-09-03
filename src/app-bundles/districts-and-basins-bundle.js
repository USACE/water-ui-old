import createRestBundle from "./create-rest-bundle";
import { isMockMode } from "./bundle-utils";
import { createSelector } from "redux-bundler";

export default createRestBundle({
  name: "districtsAndBasins",
  uid: "basin_location_code",
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
          if (matchedDistrictIds[entry.district_office_id]) return false;
          matchedDistrictIds[entry.district_office_id] = true;
          return true;
        });
        return result;
      }
    ),
    selectBasinsForDistrict: createSelector(
      "selectDistrictsAndBasinsItems",
      (districtsAndBasins) => {
        const selectedDistrict = "SPA";
        if(!selectedDistrict) return districtsAndBasins;
        const result = districtsAndBasins.filter(entry => entry.district_office_id === selectedDistrict)
        return result;
      }
    ),
  },
});
