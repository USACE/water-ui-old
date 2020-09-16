/* eslint-disable no-mixed-operators */
import { createSelector } from "redux-bundler";

export default {
  name: "districtsAndBasinsValues",

  getReducer: () => {
    const initialData = {
      districtState: undefined,
      basinState: undefined,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "SELECT_DISTRICT":
          return Object.assign({}, state, {
            districtState: payload
          });
        case "SELECT_BASIN":
          return Object.assign({}, state, {
            basinState: payload,
          });
        default:
          return state;
      }
    };
  },

  doSelectDistrict: (payload) => ({ dispatch }) => {
    dispatch({ type: "SELECT_DISTRICT", payload: payload });
  },
  doSelectBasin: (payload) => ({
    type: "SELECT_BASIN",
    payload: payload,
  }),
  selectDistrictState: (state) => {
    return state.districtsAndBasinsValues.districtState;
  },
  selectBasinState: (state) => {
    return state.districtsAndBasinsValues.basinState;
  },
};
