import { composeBundlesRaw } from "redux-bundler";
import { formatTimeSeriesName } from "../radar-time-series-bundle";
import radarTimeSeriesBundle from "../radar-time-series-bundle";

describe("locationParams Test", () => {
  let store;
  let locationParamsObject;

  const timeSeriesParam = {
    name: "timeSeriesParam",
    reducer: (state = { timeSeriesName: "" }, { type, payload }) => {
      if (type === "RAW_NAME_FETCH") {
        return Object.assign({}, state, { timeSeriesName: payload });
      }
      return state;
    },
    selectLocationTimeSeriesPlotlyData: (state) => state.timeSeriesParam,
    doLocationTimeSeriesPlotlyData: (payload) => ({ type: "RAW_NAME_FETCH", payload }),
  };

  beforeEach(() => {
    locationParamsObject = {
      "Flow-Reg": {
        "abstract-param": "Volume Rate",
        "default-english-unit": "cfs",
        "default-si-unit": "cfs",
        description: "Regulated Flow",
        "long-name": "Flow Rate",
        name: "Flow-Reg",
        office: "All",
      },
      Elev: {
        "abstract-param": "Length",
        "default-english-unit": "ft",
        "default-si-unit": "ft",
        description: "The height of a surface above a datum which approximates sea level",
        "long-name": "Elevation",
        name: "Elev",
        office: "All",
      },
    };
    store = composeBundlesRaw(timeSeriesParam)();
  });

  it("returns correct param name when param match exist", () => {
    store.doLocationTimeSeriesPlotlyData("Indian Rock.Flow-Reg.Inst.1Hour.0.computed outflow");
    const rawName = store.selectLocationTimeSeriesPlotlyData().timeSeriesName;
    expect(formatTimeSeriesName(rawName, locationParamsObject)).toBe("Flow Rate 1 Hour computed outflow");
  });

  it("returns false when name is not valid", () => {

    store.doLocationTimeSeriesPlotlyData("");
    const rawName = store.selectLocationTimeSeriesPlotlyData().timeSeriesName;
    expect(formatTimeSeriesName(rawName, locationParamsObject)).toBe(false);
  });
});
