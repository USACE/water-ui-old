/* eslint-disable no-mixed-operators */
import { createSelector } from "redux-bundler";

export const mapsBundleActions = {
  MAPS_INITIALIZED: "MAPS_INITIALIZED",
  MAPS_SHUTDOWN: "MAPS_SHUTDOWN",
};

export default {
  name: "maps",

  getReducer: () => {
    const initialData = {
      mapKey: null, // the current map that's being displayed
      zoom: null,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case mapsBundleActions.MAPS_SHUTDOWN:
          return {
            ...state,
            mapKey: null,
          };
        case mapsBundleActions.MAPS_INITIALIZED:
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    };
  },

  doMapsInitialize: mapKey => ({
    type: mapsBundleActions.MAPS_INITIALIZED,
    payload: {
      mapKey,
    },
  }),

  doMapsAddData: (mapKey, map) => ({ store }) => {
    const uCase = mapKey.charAt(0).toUpperCase() + mapKey.slice(1);
    const fnName = `do${uCase}AddData`
    store[fnName](map);
  },

  doMapsShutdown: mapKey => ({
    type: mapsBundleActions.MAPS_SHUTDOWN,
    payload: {
      mapKey,
    },
  }),

  selectMapsState: (state) => {
    return state.maps;
  },

  selectIsMapsDataLoaded: state => {
    const mapKey = state.maps.mapKey;
    if (!mapKey) {
      return false;
    }
    return state[mapKey]._isDataLoaded;
  },

  selectIsMapsLoaded: state => {
    const mapKey = state.maps.mapKey;
    if (!mapKey) {
      return false;
    }
    return state[mapKey]._isMapLoaded;
  },

  selectMapsObject: createSelector("selectMapsState", (state) => {
    const items = {};
    Object.keys(state).forEach((key) => {
      if (key[0] !== "_") items[key] = state[key];
    });
    return items;
  }),

  selectMapsFlags: createSelector("selectMapsState", (state) => {
    const flags = {};
    Object.keys(state).forEach((key) => {
      if (key[0] === "_") flags[key] = state[key];
    });
    return flags;
  }),
};
