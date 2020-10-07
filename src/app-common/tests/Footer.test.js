import React from "react";
import { shallow } from "enzyme";

// Component import:
import Footer from "../Footer";

// Utils:
import { findByTestAttr } from "../../../testUtils";

// Set up the component with props:
const initialSetup = (props) => {
  const wrapper = shallow(
    <Footer {...props} />
  );
  return wrapper;
};

test("component renders without error", () => {
  const wrapper = initialSetup();
  const component = findByTestAttr(wrapper, "component-footer-container");
  expect(component.length).toBe(1);
});
