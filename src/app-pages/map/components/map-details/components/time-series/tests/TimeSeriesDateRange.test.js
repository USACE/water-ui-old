import React from "react";
import { shallow } from "enzyme";
import { TIME } from "../../../../../../../utils";
import { TimeSeriesDateRange } from "../TimeSeriesDateRange";

describe("<TimeSeriesDateRange />", () => {
  const renderOptions = { disableLifecycleMethods: true };
  const baseProps = {
    ltsTimeControl: TIME.WEEK,
    ltsCustomStartDate: "",
    ltsCustomEndDate: "",
    doLtsSetTimeControl: jest.fn(),
    doLtsSetCustomDate: jest.fn(),
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TimeSeriesDateRange {...baseProps} />, renderOptions);
  });

  it("should render date range", () => {
    expect(wrapper.find("label").length).toBe(1);
    expect(wrapper.find("label").props().children).toBe("Date Range");
  });

  it("should render start and end date selectors", () => {
    wrapper.setProps({ ltsTimeControl: -1 })
    expect(wrapper.find("label").length).toBe(3);
    expect(wrapper.find("label").at(1).props().children).toBe("Start Date");
    expect(wrapper.find("label").at(2).props().children).toBe("End Date");
  });

  it("should update the date range", () => {
    const doLtsSetTimeControl = jest.fn();
    wrapper.setProps({ doLtsSetTimeControl });

    const mockEvent = {
      target: { value: `${TIME.MONTH}` },
    }
    wrapper.find("select").prop("onChange")(mockEvent);
    expect(doLtsSetTimeControl).toHaveBeenCalledWith(TIME.MONTH);
  });

  it("should update the start and end dates", () => {
    const doLtsSetCustomDate = jest.fn();
    wrapper.setProps({ doLtsSetCustomDate, ltsTimeControl: -1 });

    // change the start date
    const mockStartDate = {
      target: {
        name: "customStartDate",
        value: "2020-11-01",
      },
    };
    wrapper.find("input").at(0).prop("onChange")(mockStartDate);
    expect(doLtsSetCustomDate).toHaveBeenCalledWith(mockStartDate.target.name, mockStartDate.target.value);

    // change the end date
    const mockEndDate = {
      target: {
        name: "customEndDate",
        value: "2020-11-30",
      },
    };
    wrapper.find("input").at(0).prop("onChange")(mockEndDate);
    expect(doLtsSetCustomDate).toHaveBeenCalledWith(mockEndDate.target.name, mockEndDate.target.value);
  });
});
