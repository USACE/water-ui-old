import React from "react";
import { shallow } from "enzyme";
import Accordion from "../Accordion";

describe("<Accordion />", () => {
  const renderOptions = { disableLifecycleMethods: true };

  const formatId = (title) => {
    return title && title.toLowerCase().replace(" ", "_");
  };

  const baseProps = {
    formatId: formatId,
    data: [ {
      title: "Time Series",
      content:
        "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
      iconClass: "mdi mdi-map-marker"
    },
    {
      title: "Sedimentation",
      content:
        "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do ddd.",
      iconClass: "mdi mdi-map-marker"
    } ],
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Accordion {...baseProps} />, renderOptions);
  });

  it("component renders without error", () => {
    expect(wrapper.length).toBe(1);
  });

  it("number of btns to match number of content divs", () => {
    const buttons = wrapper.find("button");
    const divs = wrapper.find(".accordion-content");
    expect(buttons.length).toBe(divs.length);
  });
});