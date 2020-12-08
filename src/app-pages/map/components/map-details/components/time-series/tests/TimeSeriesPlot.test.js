import React from "react";
import { shallow } from "enzyme";
import TimeSeriesPlot from "../TimeSeriesPlot";
import { mockLocationTimeSeriesPlotlyData } from "./mocks";

describe("<TimeSeriesPlot />", () => {
  const renderOptions = { disableLifecycleMethods: true };
  const baseProps = {
    locationTimeSeriesPlotlyData: mockLocationTimeSeriesPlotlyData,
    plotName: "plot1",
    plotHeight: 300,
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TimeSeriesPlot {...baseProps} />, renderOptions);
  });

  it("should render plot", () => {
    expect(wrapper.find("PlotlyComponent").length).toBe(1);
  });

  it("should display 'No Data' if locationTimeSeriesPlotlyData is null", () => {
    wrapper.setProps({ locationTimeSeriesPlotlyData: null });
    expect(wrapper.find("p").props().children).toBe("No data for the selected date range.");
  });

  it("should display 'No Data' if locationTimeSeriesPlotlyData is empty object", () => {
    wrapper.setProps({ locationTimeSeriesPlotlyData: {} });
    expect(wrapper.find("p").props().children).toBe("No data for the selected date range.");
  });

  it("should not render anything if locationTimeSeriesPlotlyData does not contain the plotName", () => {
    wrapper.setProps({ plotName: "newPlotWhoDis" });
    expect(wrapper.find("PlotlyComponent").length).toBe(0);
    expect(wrapper.find("p").length).toBe(0);
  });
});
