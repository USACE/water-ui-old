import createRestBundle from "./create-rest-bundle";
import { getRestUrl } from "./bundle-utils";
import { createSelector } from "redux-bundler";
import { RoutePaths } from "./route-paths";
import { isPresent } from "../utils/functions";

const DISTRICTS_AND_BASINS_SET_DISTRICT_ID = "DISTRICTS_AND_BASINS_SET_DISTRICT_ID";
const DISTRICTS_AND_BASINS_SET_BASIN_ID = "DISTRICTS_AND_BASINS_SET_BASIN_ID";
const DISTRICTS_AND_BASINS_REFORMAT_DATA = "DISTRICTS_AND_BASINS_REFORMAT_DATA";
const DISTRICTS_AND_BASINS_IS_UPDATING = "DISTRICTS_AND_BASINS_IS_UPDATING";
const DISTRICTS_AND_BASINS_SET_FROM_QUERY = "DISTRICTS_AND_BASINS_SET_FROM_QUERY";
const DISTRICTS_AND_BASINS_SET_DISTRICT_AND_BASIN = "DISTRICTS_AND_BASINS_SET_DISTRICT_AND_BASIN";

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
    is_updating: false
  },
  reduceFurther: ( state, { type, payload } ) => {
    switch( type ) {
      case DISTRICTS_AND_BASINS_SET_DISTRICT_ID:
      case DISTRICTS_AND_BASINS_SET_BASIN_ID:
      case DISTRICTS_AND_BASINS_REFORMAT_DATA:
      case DISTRICTS_AND_BASINS_SET_FROM_QUERY:
      case DISTRICTS_AND_BASINS_IS_UPDATING:
      case DISTRICTS_AND_BASINS_SET_DISTRICT_AND_BASIN:
        return Object.assign( {}, state, payload );
      case "URL_UPDATED": // Appears to be needed to get the URL sync reactor to run after URL updates
        return Object.assign( {}, state );
      default:
        return state;
    }
  },
  addons: {
    // Once the districts and basins data has been loaded, reformat the data so that all the basins are grouped by district
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
      const basins = {};

      data.forEach(({ district_id, district_name, ...basinInfo }) => {
        // Initialize the district object if it does not exists
        if (!districts[district_id]) {
          districts[district_id] = {
            district_id,
            district_name,
            basins: [],
          };
        }
        // Create a new basin object and add it to the basins array for its corresponding district, as well as the basins lookup object
        const basin = { ...basinInfo, district_id: district_id, district_name: district_name };
        districts[district_id].basins.push( basin );
        basins[basin.basin_id] = basin;
      });
      return {
        type: DISTRICTS_AND_BASINS_REFORMAT_DATA,
        payload: {
          data: districts,
          basinData: basins
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
      "selectAllBasins",
      (selectedDistrict, data, allBasins) => {
        if( !data || Array.isArray( data ) ) return [];

        /** @type a2w.models.DistrictBasin[] */
        let basins = [];

        if( selectedDistrict ) basins = data[selectedDistrict].basins;
        else basins = Object.values( allBasins ); // Allows user to pick from full list without choosing a district first

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

    doSetSelectedDistrictAndBasin: ( districtId, basinId ) => ( {
      type: DISTRICTS_AND_BASINS_SET_DISTRICT_AND_BASIN,
      payload: {
        district_id: districtId,
        basin_id: basinId,
      }
    } ),

    doUpdateDistrictBasinMapQuery: ( { preventUrlUpdate = false, districtId, basinId } ) => ( { store } ) => {
      // Set updating flag so the URL check reactor knows not run while updates are made.
      store.doSetDistrictBasinIsUpdating( true );

      // Update the selected items if they were passed in.
      if( isPresent( districtId ) && isPresent( basinId ) ) store.doSetSelectedDistrictAndBasin( districtId, basinId );
      else if( isPresent( districtId ) ) store.doSetSelectedDistrict( districtId );
      else if( isPresent( basinId ) ) store.doSetSelectedBasin( basinId );

      const newQuery = Object.assign( {}, store.selectQueryObject() );
      delete newQuery.districtId;
      delete newQuery.basinId;

      // Clear the district/basin query string values if they are empty
      if( !districtId && !basinId ) {
        store.doUpdateQuery( newQuery );
      }
      // Otherwise, proceed to update the URL
      else {
        const districts = store.selectDistrictsAndBasinsData();
        const district = districts[ districtId ];

        // Set the district
        if( district ) newQuery.districtId = district.district_id;

        let basin;
        // Set the basin
        if( basinId ) {

          // Find basin in district, or if no district, find basin in the full list of basins
          if( district ) basin = district.basins.find( item => item.basin_id === basinId );
          else basin = Object.values( store.selectAllBasins() ).find( basin => basin.basin_id === basinId );

          // If we have a basin, use the basin's lat/lon
          if( basin ) {
            newQuery.basinId = basin.basin_id;
            newQuery.lat = basin.latitude;
            newQuery.lon = basin.longitude;
            newQuery.zoom = 8;
          }
        }

        // If we only have a district, use average lat/lon from the district's basins
        if( !basin && district && district.basins.length > 0 ) {
          newQuery.districtId = districtId;
          newQuery.lat = ( district.basins.reduce( ( acc, b ) => acc + b.latitude, 0 ) / district.basins.length ).toPrecision( 5 );
          newQuery.lon = ( district.basins.reduce( ( acc, b ) => acc + b.longitude, 0 ) / district.basins.length ).toPrecision( 5 );
          newQuery.zoom = 7;
        }

        if( !preventUrlUpdate ) store.doUpdateUrl( { pathname: RoutePaths.Map, query: newQuery } );
      }

      // Set update flag back to false
      store.doSetDistrictBasinIsUpdating( false );
    },

    doSetDistrictBasinIsUpdating: flag => ( {
      type: DISTRICTS_AND_BASINS_IS_UPDATING,
      payload: {
        is_updating: flag,
      },
    }),

    doSetSelectedBasin: id => ( {
      type: DISTRICTS_AND_BASINS_SET_BASIN_ID,
      payload: {
        basin_id: id,
      },
    }),

    selectSelectedDistrict: state => state[name].district_id,

    selectSelectedBasin: state => state[name].basin_id,

    selectDistrictBasinIsUpdating: state => state[name].is_updating,

    selectAllBasins: state => state[name].basinData,

    // Keep URL and selected items in sync
    reactShouldSetDistrictBasinFromQuery: createSelector(
      "selectQueryObject",
      "selectSelectedDistrict",
      "selectSelectedBasin",
      "selectDistrictBasinIsUpdating",
      ( queryObject, selectedDistrict, selectedBasin, districtBasinIsUpdating ) => {
        if(
          // Only update selected district/basin if the query string value doesn't match the selected value.
          // Also, clear the selected basin if the query string has no basin value.
          !districtBasinIsUpdating && (
            ( queryObject.districtId && queryObject.districtId !== selectedDistrict )
            || ( queryObject.basinId && queryObject.basinId !== selectedBasin )
            || ( !isPresent( queryObject.basinId ) && selectedBasin )
          )
        ) {
          return {
            type: DISTRICTS_AND_BASINS_SET_FROM_QUERY,
            payload: {
              district_id: queryObject.districtId || "",
              basin_id: queryObject.basinId || "",
            },
          };
        }
      }
    ),

  },
} );
