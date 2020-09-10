/* eslint-disable no-mixed-operators */
import { createSelector } from "redux-bundler";

export default {
  name: "districtsAndBasinsValues",

  getReducer: () => {
    const initialData = {
      districtState: "",
      basinState: "",
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "SELECT_DISTRICT":
          console.log("return state;", payload);
          return Object.assign({}, state, {
            districtState: payload
          });
        case "SELECT_BASIN":
          console.log("return state2;", payload);
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
    console.log(state)
    return state.districtsAndBasinsValues.districtState;
  },
  selectBasinState: (state) => {
    console.log("basin",state)
    return state.districtsAndBasinsValues.basinState;
  },
};
