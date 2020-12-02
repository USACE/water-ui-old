import { createSelector } from "redux-bundler";
import { mapsBundleActions } from "./maps-bundle";

const actions = {
  LOCATIONS_MAP_DATA_LOADED: "LOCATIONS_MAP_DATA_LOADED",
  LOCATIONS_MAP_LOADED: "LOCATIONS_MAP_LOADED",
  LOCATIONS_MAP_SAVE_MAP_STATE: "LOCATIONS_MAP_SAVE_MAP_STATE",
};

const name = "locationsMap";

export default {
  name,

  getReducer: () => {
    const initialData = {
      mapState: {},
      _isInitialized: false,
      _isDataLoaded: false,
      _isMapLoaded: false,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case mapsBundleActions.MAPS_INITIALIZED: {
          if (payload.mapKey === name) {
            return {
              ...state,
              _isInitialized: true
            };
          }
          return state;
        }
        case mapsBundleActions.MAPS_SHUTDOWN: {
          if (payload.mapKey === name) {
            return {
              ...state,
              _isInitialized: false,
              _isDataLoaded: false,
              _isMapLoaded: false,
            };
          }
          return state;
        }
        case actions.LOCATIONS_MAP_DATA_LOADED:
        case actions.LOCATIONS_MAP_LOADED:
        case actions.LOCATIONS_MAP_SAVE_MAP_STATE:
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    };
  },

  selectLocationsMapIsInitialized: state => state.locationsMap._isInitialized,

  selectLocationsMapIsDataLoaded: state => state.locationsMap._isDataLoaded,

  selectLocationsMapIsLoaded: state => state.locationsMap._isMapLoaded,

  selectLocationsMapMapState: state => state.locationsMap.mapState,

  /**
   * Get Map query params but convert numeric params (lat/lon/zoom) from strings to numbers for later use
   */
  selectLocationMapQueryObject: createSelector(
    "selectQueryObject",
    queryObject => {
      queryObject = { ...queryObject };
      // Convert lat/lon/zoom from URL string to number
      if( queryObject.lat ) queryObject.lat = parseFloat( `${ queryObject.lat }` );
      if( queryObject.lon ) queryObject.lon = parseFloat( `${ queryObject.lon }` );
      if( queryObject.zoom ) queryObject.zoom = parseFloat( `${ queryObject.zoom }` );
      return queryObject;
    },
  ),

  doLocationsMapDataLoaded: () => ({
    type: actions.LOCATIONS_MAP_DATA_LOADED,
    payload: {
      _isDataLoaded: true,
    },
  }),

  doLocationsMapLoaded: () => ({
    type: actions.LOCATIONS_MAP_LOADED,
    payload: {
      _isMapLoaded: true,
    },
  }),

  doLocationsMapSaveMapState: mapState => ({
    type: actions.LOCATIONS_MAP_SAVE_MAP_STATE,
    payload: {
      mapState,
    },
  }),

  reactLocationsMapShouldAddData: createSelector(
    "selectLocationsMapIsInitialized",
    "selectLocationsMapIsDataLoaded",
    "selectLocationSummaries",
    (isInitialized, isDataLoaded, locationSummaries) => {
      if (isInitialized && !isDataLoaded && locationSummaries && locationSummaries.length > 0) {
        return { actionCreator: "doLocationsMapDataLoaded" };
      }
    },
  ),
};
