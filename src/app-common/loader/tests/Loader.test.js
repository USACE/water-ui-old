import React from "react";
import { shallow } from "enzyme";
import Loader, { loaderTypes } from "../Loader";

describe("<Loader />", () => {
  const renderOptions = { disableLifecycleMethods: true };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow( <Loader />, renderOptions );
  });

  it("should render spinner by default", () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find("div").at(1).prop("className")).toBe("spinner-border");
  });

  it("should render dissolving cube animation", () => {
    wrapper.setProps({ type: loaderTypes.DISSOLVE_CUBE });
    expect(wrapper.find("div").at(1).prop("className")).toBe("dissolve-cube-grid");
  });

  it("should render spinning cube animation", () => {
    wrapper.setProps({ type: loaderTypes.SPIN_CUBES });
    expect(wrapper.find("div").at(1).prop("className")).toBe("spin-cubes");
  });

  it("should render marching bars animation", () => {
    wrapper.setProps({ type: loaderTypes.MARCHING_BARS });
    expect(wrapper.find("div").at(1).prop("className")).toBe("marching-bars");
  });

  it("should render folding cube animation", () => {
    wrapper.setProps({ type: loaderTypes.FOLDING_CUBE });
    expect(wrapper.find("div").at(1).prop("className")).toBe("sk-folding-cube");
  });

  it("should render spinner animation", () => {
    wrapper.setProps({ type: loaderTypes.SPINNER });
    expect(wrapper.find("div").at(1).prop("className")).toBe("spinner-border");
  });
});