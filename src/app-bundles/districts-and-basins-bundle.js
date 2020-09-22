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
  getTemplate: isMockMode() ? "/districts-and-basins.json" : "/water/locations/basins",
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  reduceFurther: (state, { type, payload }) => {
    switch (type) {
      case "SET_SELECTED_DISTRICT_ID":
      case "SET_SELECTED_BASIN_ID":
        return Object.assign({}, state, payload);
      default:
        return state;
    }
  },
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
      "selectSelectedDistrict",
      (districtsAndBasins, selectedDistrict) => {
        if(!selectedDistrict) return districtsAndBasins;
        const result = districtsAndBasins.filter(entry => entry.district_office_id === selectedDistrict)
        return result;
      }
    ),
    doSetSelectedDistrict: (id) => ({ dispatch }) => {
      dispatch({
        type: "SET_SELECTED_DISTRICT_ID",
        payload: {
          _district_office_id: id,
          _basin_location_id: null
        },
      });
    },
    doSetSelectedBasin: (id) => ({ dispatch }) => {
      dispatch({
        type: "SET_SELECTED_BASIN_ID",
        payload: {
          _basin_location_id: id,
        },
      });
    },
    selectSelectedDistrict: (state) => {
      return state.districtsAndBasins._district_office_id;
    },
    selectSelectedBasin: (state) => {
      return state.districtsAndBasins._basin_location_id;
    },
  },
});
