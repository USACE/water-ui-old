import React from "react";
import { shallow } from "enzyme";

// Component import:
import Timeline from "../timeline/Timeline";

// utils:
import { findElementByClassName } from "../../testUtils";

describe("<Accordion />", () => {
  const renderOptions = { disableLifecycleMethods: true };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Timeline />, renderOptions);
    wrapper.setProps({
      timelineData:[
        {
          text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
          date: "January 1 2020",
        },
        {
          text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
          date: "March 01 2020",
        },
        {
          text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
          date: "April 01 2020",
        },
        {
          text: "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit",
          date: "May 01 2020",
        },
      ],
      align: "vertical"
    });
  });

  it("component renders without error", () => {
    expect(wrapper.length).toBe(1);
  });

  it("renders correct number of data points", () => {
    const timelineContainer = findElementByClassName(wrapper, "timeline-container");
    const timelineItems = findElementByClassName(wrapper, "timeline-item");

    expect(timelineContainer.length).toBe(1);
    expect(timelineItems.length).toBe(4);
  });
});
