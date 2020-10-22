/* eslint-disable no-mixed-operators */
import { createSelector } from "redux-bundler";

export const mapsBundleActions = {
  MAPS_INITIALIZED: "MAPS_INITIALIZED",
  MAPS_SHUTDOWN: "MAPS_SHUTDOWN",
};

export default {
  name: "maps",

  getReducer: () => {
    const initialData = {};
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case mapsBundleActions.MAPS_INITIALIZED:
        case mapsBundleActions.MAPS_SHUTDOWN:
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

  doMapsShutdown: mapKey => ({
    type: mapsBundleActions.MAPS_SHUTDOWN,
    payload: {
      mapKey,
    },
  }),

  selectMapsState: (state) => {
    return state.maps;
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
