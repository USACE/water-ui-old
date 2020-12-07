import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Provider } from "redux-bundler-react";
import { composeBundles, createRouteBundle } from "redux-bundler";
import radarTimeSeriesBundle from "../../../../../../../app-bundles/radar-time-series-bundle";
import { TimeSeriesSection } from "../TimeSeriesSection";
import { mockLocationTimeSeriesPlotlyData } from "./mocks";

describe("<TimeSeriesSection />", () => {
  const renderOptions = { disableLifecycleMethods: true };
  const baseProps = {
    queryObject: {},
    locationTimeSeriesPlotlyData: mockLocationTimeSeriesPlotlyData,
    locationTimeSeriesIsLoading: false,
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TimeSeriesSection {...baseProps} />, renderOptions);
  });

  it("should render component", () => {
    expect(wrapper.find("Loader").length).toBe(0);
    expect(wrapper.find("TimeSeriesPlot").length).toBe(1);
    expect(wrapper.find("connect(TimeSeriesDateRange)").length).toBe(1);
    expect(wrapper.find("TimeSeriesPlotLegend").length).toBe(1);
  });

  it("should render loader", () => {
    wrapper.setProps({ locationTimeSeriesIsLoading: true });
    expect(wrapper.find("Loader").length).toBe(1);
  });

  it("should set plot height to 450 if display is full screen", () => {
    wrapper.setProps({
      queryObject: { display: "fs" },
    });
    expect(wrapper.find("TimeSeriesPlot").prop("plotHeight")).toBe(450);
  });

  describe("test useEffect()", () => {
    const store = composeBundles(
      createRouteBundle({}),
      radarTimeSeriesBundle,
      {
        name: "mock",
        selectAuthRoles: () => [],
        selectLocationDetailData: () => {},
      }
    )();

    const Proxy = (props) => (
      <Provider store={store}>
        <TimeSeriesSection {...props} />
      </Provider>
    );
    beforeEach(() => {
      wrapper = mount(<Proxy {...baseProps} />);
    });

    afterEach(() => {
      wrapper.unmount();
    })

    it("should set plotName to the first plot when the locationTimeSeriesPlotlyData loads", () => {
      expect(wrapper.find("TimeSeriesPlot").prop("plotName")).toBe("plot1");
    });

    it("should update plotName via setPlotName", async () => {
      expect(wrapper.find("TimeSeriesPlot").prop("plotName")).toBe("plot1");
      await act(async () => {
        wrapper.find("TimeSeriesPlotLegend").prop("setPlotName")("plot3")
      });
      wrapper.update();
      expect(wrapper.find("TimeSeriesPlot").prop("plotName")).toBe("plot3");
    });

    it("should update plotName to the first plot in locationTimeSeriesPlotlyData if locationTimeSeriesPlotlyData changes", async () => {
      // initially plotName should be "plot1"
      expect(wrapper.find("TimeSeriesPlot").prop("plotName")).toBe("plot1");

      // change locationTimeSeriesPlotlyData data
      await act(async () => {
        wrapper.setProps({
          locationTimeSeriesPlotlyData: {
            "plot4": {
              name: "plot4",
              x: [],
              y: [],
            },
            "plot5": {
              name: "plot5",
              x: [],
              y: [],
            },
          },
        });
      });
      wrapper.update();

      // plotName should be plot4
      expect(wrapper.find("TimeSeriesPlot").prop("plotName")).toBe("plot4");
    });

    it("should not update plotName if locationTimeSeriesPlotlyData is an empty object", async () => {
      // initially plotName should be "plot1"
      expect(wrapper.find("TimeSeriesPlot").prop("plotName")).toBe("plot1");

      // change locationTimeSeriesPlotlyData to an empty object
      await act(async () => {
        wrapper.setProps({ locationTimeSeriesPlotlyData: {} });
      });
      wrapper.update();
      expect(wrapper.find("TimeSeriesPlot").prop("plotName")).toBe("plot1");
    });
  });
});
