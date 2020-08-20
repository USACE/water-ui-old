import React from "react";
import { shallow } from "enzyme";

// Component import:
import SearchBox from "./index";

// Utils:
import { findByTestAttr } from "../../testUtils";

// Set up the component with props:
const initialSetup = (props) => {
  const wrapper = shallow(
    <SearchBox {...props}/>
  );
  return wrapper;
};

test("component renders without error", () => {
  const wrapper = initialSetup();
  const component = findByTestAttr(wrapper, "search-box-container");
  expect(component.length).toBe(1);
});