import { createSelector } from "redux-bundler";
import { mapsBundleActions } from "../maps-bundle";

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
    "selectLocationTree", // In order to filter the map based on tree location, must wait for tree before creating map.
    (isInitialized, isDataLoaded, locationSummaries) => {
      if (isInitialized && !isDataLoaded && locationSummaries && locationSummaries.length > 0) {
        return { actionCreator: "doLocationsMapDataLoaded" };
      }
    },
  ),
};
