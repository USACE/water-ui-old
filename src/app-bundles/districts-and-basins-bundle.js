import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";

const DISTRICTS_AND_BASINS_SET_DISTRICT_ID = "DISTRICTS_AND_BASINS_SET_DISTRICT_ID";
const DISTRICTS_AND_BASINS_SET_BASIN_ID = "DISTRICTS_AND_BASINS_SET_BASIN_ID";
const DISTRICTS_AND_BASINS_REFORMAT_DATA = "DISTRICTS_AND_BASINS_REFORMAT_DATA";

const name = "districtsAndBasins";
export default createRestBundle( {
  name,
  uid: "basin_location_code",
  prefetch: true,
  staleAfter: 10000,
  persist: false,
  getTemplate: getRestUrl( "/water/locations/basins", "/districts-and-basins.json" ),
  putTemplate: null,
  postTemplate: null,
  deleteTemplate: null,
  fetchActions: [],
  forceFetchActions: [],
  defaultState: {
    district_office_id: "", // selected district
    basin_location_id: "", // selected basin
  },
  reduceFurther: ( state, { type, payload } ) => {
    switch( type ) {
      case DISTRICTS_AND_BASINS_SET_DISTRICT_ID:
      case DISTRICTS_AND_BASINS_SET_BASIN_ID:
      case DISTRICTS_AND_BASINS_REFORMAT_DATA:
        return Object.assign( {}, state, payload );
      default:
        return state;
    }
  },
  addons: {
    // once the districts and basins data has been loaded, reformat the data so that all the basins are grouped by district
    reactDistrictsAndBasinsFormatData: createSelector(
      "selectDistrictsAndBasinsData",
      (data) => {
        if (data && Array.isArray(data)) {
          return {
            actionCreator: "doDistrictsAndBasinsFormatData",
            args: [data],
          };
        }
      }
    ),

    doDistrictsAndBasinsFormatData: ( /** @type a2w.models.DistrictBasin[] */ data) => {
      const districts = {};
      data.forEach(({ district_office_id, district_name, ...basinInfo }) => {
        // initialize the district object if it does not exists
        if (!districts[district_office_id]) {
          districts[district_office_id] = {
            district_office_id,
            district_name,
            basins: [],
          };
        }
        // create a new basin object and add it to the basins array for it's correspondin district
        districts[district_office_id].basins.push({ ...basinInfo });
      });
      return {
        type: DISTRICTS_AND_BASINS_REFORMAT_DATA,
        payload: {
          data: districts,
        }
      };
    },

    selectDistricts: createSelector(
      "selectDistrictsAndBasinsData",
      (data) => {
        if (!data || Array.isArray(data)) {
          return [];
        }
        const districts = Object.keys(data).map((key) => ({
          district_office_id: key,
          district_name: data[key].district_name,
        }));
        districts.sort((a, b) => a.district_name > b.district_name ? 1 : -1)
        return districts;
      }
    ),
  
    selectBasins: createSelector(
      "selectSelectedDistrict",
      "selectDistrictsAndBasinsData",
      (selectedDistrict, data) => {
        if (!data || Array.isArray(data) || !selectedDistrict) {
          return [];
        }
        /** @type a2w.models.DistrictBasin[] */
        const basins = data[selectedDistrict].basins;
        basins.sort((a, b) => a.basin_name > b.basin_name ? 1 : -1);
        return basins;
      }
    ),
  
    doSetSelectedDistrict: id => ({
      type: DISTRICTS_AND_BASINS_SET_DISTRICT_ID,
      payload: {
        district_office_id: id,
        basin_location_id: "",
      },
    }),

    doSetSelectedBasin: id => ( {
      type: DISTRICTS_AND_BASINS_SET_BASIN_ID,
      payload: {
        basin_location_id: id,
      },
    }),

    selectSelectedDistrict: state => state[name].district_office_id,

    selectSelectedBasin: state => state[name].basin_location_id,
  },
} );
