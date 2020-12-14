import React from "react";
import { shallow } from "enzyme";
import TimeSeriesPlotLegend from "../TimeSeriesPlotLegend";
import { mockLocationTimeSeriesPlotlyData } from "./mocks";

describe("<TimeSeriesPlotLegend />", () => {
  const renderOptions = { disableLifecycleMethods: true };
  const baseProps = {
    locationTimeSeriesPlotlyData: mockLocationTimeSeriesPlotlyData,
    plotName: "plot1",
    setPlotName: jest.fn(),
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TimeSeriesPlotLegend {...baseProps} />, renderOptions);
  });

  it("should render plot", () => {
    expect(wrapper.find("table").length).toBe(1);
  });

  it("should not render anything if locationTimeSeriesPlotlyData is null", () => {
    wrapper.setProps({ locationTimeSeriesPlotlyData: null });
    expect(wrapper.find("table").length).toBe(0);
  });

  it("should not render anything if locationTimeSeriesPlotlyData is empty object", () => {
    wrapper.setProps({ locationTimeSeriesPlotlyData: {} });
    expect(wrapper.find("table").length).toBe(0);
  });

  it("should call setPlotName if a table row is clicked", () => {
    const setPlotName = jest.fn();
    wrapper.setProps({ setPlotName });

    // sumulate clicking the second table row
    wrapper.find("tr").at(2).prop("onClick")();

    expect(setPlotName).toBeCalledWith("plot2");
  });
});
