import React from "react";
import { shallow } from "enzyme";

// Component import:
import Accordion from "../accordion/Accordion";

// utils:
import { findByElementType, findElementByClassName } from "../../testUtils";

describe("<Accordion />", () => {
  const renderOptions = { disableLifecycleMethods: true };

  const formatId = (title) => {
    return title && title.toLowerCase().replace(" ", "_");
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Accordion data={[]} />, renderOptions);
    wrapper.setProps({
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

    });
  });

  it("component renders without error", () => {
    expect(wrapper.length).toBe(1);
  });

  it("number of btns to match number of content divs", () => {
    const btns = findByElementType(wrapper, "button");
    const contentDivs = findElementByClassName(wrapper, "accordion-content")

    expect(contentDivs.length).toBe(btns.length);
  });
});
