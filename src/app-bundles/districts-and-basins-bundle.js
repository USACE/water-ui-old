import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";
import { RoutePaths } from "./route-paths";

const DISTRICTS_AND_BASINS_SET_DISTRICT_ID = "DISTRICTS_AND_BASINS_SET_DISTRICT_ID";
const DISTRICTS_AND_BASINS_SET_BASIN_ID = "DISTRICTS_AND_BASINS_SET_BASIN_ID";
const DISTRICTS_AND_BASINS_REFORMAT_DATA = "DISTRICTS_AND_BASINS_REFORMAT_DATA";
const DISTRICTS_AND_BASINS_SET_FROM_QUERY = "DISTRICTS_AND_BASINS_SET_SELECTED";

const name = "districtsAndBasins";
export default createRestBundle( {
  name,
  uid: "basin_id",
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
    district_id: "", // selected district
    basin_id: "", // selected basin
    query_checked: false
  },
  reduceFurther: ( state, { type, payload } ) => {
    switch( type ) {
      case DISTRICTS_AND_BASINS_SET_DISTRICT_ID:
      case DISTRICTS_AND_BASINS_SET_BASIN_ID:
      case DISTRICTS_AND_BASINS_REFORMAT_DATA:
      case DISTRICTS_AND_BASINS_SET_FROM_QUERY:
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
      data.forEach(({ district_id, district_name, ...basinInfo }) => {
        // initialize the district object if it does not exists
        if (!districts[district_id]) {
          districts[district_id] = {
            district_id,
            district_name,
            basins: [],
          };
        }
        // create a new basin object and add it to the basins array for it's correspondin district
        districts[district_id].basins.push(Object.assign({ ...basinInfo, district_id: district_id, district_name: district_name }));
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
          district_id: key,
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
        if( !data || Array.isArray( data ) ) return [];

        /** @type a2w.models.DistrictBasin[] */
        let basins = [];

        if( selectedDistrict ) basins = data[selectedDistrict].basins;
        else Object.values( data ).forEach( item => basins.push( ...item.basins ) );

        basins.sort((a, b) => a.basin_name > b.basin_name ? 1 : -1);
        return basins;
      }
    ),

    doSetSelectedDistrict: ( id ) => ( {
        type: DISTRICTS_AND_BASINS_SET_DISTRICT_ID,
        payload: {
          district_id: id,
          basin_id: "",
        }
    } ),

    doUpdateDistrictBasinMapQuery: ( requiresDistrictAndBasin ) => ( { store, dispatch } ) => {
      const districtId = store.selectSelectedDistrict();
      const basinId = store.selectSelectedBasin();
      const newQuery = Object.assign( {}, store.selectQueryObject() );
      delete newQuery.districtId;
      delete newQuery.basinId;

      if( !districtId && !basinId ) {
        store.doUpdateQuery( newQuery );
        return;
      }

      const data = store.selectDistrictsAndBasinsData();
      const district = data[ districtId ];
      let basin;

      if( district ) newQuery.districtId = district.district_id;
      let isDistrictOnly = true;

      if( basinId ) {
        if( district ) basin = district.basins.find( item => item.basin_id === basinId );
        else {
          Object.values( data ).some( district => {
            basin = district.basins.find( basin => basin.basin_id === basinId );
            return basin;
          } );
        }

        // If we have a basin, use the basin's lat/lon
        if( basin ) {
          newQuery.basinId = basin.basin_id;
          newQuery.lat = basin.latitude;
          newQuery.lon = basin.longitude;
          newQuery.zoom = 8;
          isDistrictOnly = false;
        }
      }

      // If the flag was passed to require both district and basin, only continue if both are present.
      if( requiresDistrictAndBasin && isDistrictOnly ) return;

      // If we only have a district, use average lat/lon from the child basins
      if( isDistrictOnly && district.basins.length > 0 ) {
        newQuery.districtId = districtId;
        newQuery.lat = district.basins.reduce( ( acc, b) => acc + b.latitude, 0 ) / district.basins.length;
        newQuery.lon = district.basins.reduce( ( acc, b) => acc + b.longitude, 0 ) / district.basins.length;
        newQuery.zoom = 7;
      }

      store.doUpdateUrl( { pathname: RoutePaths.Map, query: newQuery } );
    },

    doSetSelectedBasin: id => ( {
      type: DISTRICTS_AND_BASINS_SET_BASIN_ID,
      payload: {
        basin_id: id,
      },
    }),

    selectSelectedDistrict: state => state[name].district_id,

    selectSelectedBasin: state => state[name].basin_id,

    selectDistrictBasinQueryChecked: state => state[name].query_checked,

    // To set selected district and basin from URL, if state values have not been set yet.
    reactShouldSetDistrictBasinFromQuery: createSelector(
      "selectQueryObject",
      "selectSelectedDistrict",
      "selectDistrictBasinQueryChecked",
      ( queryObject, selectedDistrict, districtBasinQueryChecked ) => {
        if( !districtBasinQueryChecked ) {
          return {
            type: DISTRICTS_AND_BASINS_SET_FROM_QUERY,
            payload: {
              district_id: queryObject.districtId || "",
              basin_id: queryObject.basinId || "",
              query_checked: true
            },
          };
        }
      }
    ),

  },
} );
