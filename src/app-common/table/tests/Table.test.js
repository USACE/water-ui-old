import React from "react";
import { shallow } from "enzyme";
import Table from "../Table";

describe("<Table />", () => {
  const renderOptions = { disableLifecycleMethods: true };

  let wrapper;
  const baseProps = {
    header: ["Name", "Weapon"],
    body: [{
      id: "row-1",
      row: ["Aragorn", "Sword"],
    }, {
      id: "row-2",
      row: ["Legolas", "Bow"],
    }, {
      id: "row-3",
      row: ["Gimli", "Axe"],
    }, {
      id: "row-4",
      row: ["Gandalf", "Staff"],
    }]
  };
  beforeEach(() => {
    wrapper = shallow(<Table {...baseProps} />, renderOptions);
  });

  it("should render table", () => {
    expect(wrapper.length).toBe(1);
    // number of table row should equal number of rows in the body plus one for the header
    expect(wrapper.find("tr").length).toBe(baseProps.body.length + 1);

    // check that the table headers are correct
    expect(wrapper.find("thead").length).toBe(1);
    expect(wrapper.find("th").length).toBe(2);
    expect(wrapper.find("th").at(0).props().children).toEqual(baseProps.header[0]);
    expect(wrapper.find("th").at(1).props().children).toEqual(baseProps.header[1]);

    // check that the number of table cells is correct
    expect(wrapper.find("tbody").length).toBe(1);
    expect(wrapper.find("td").length).toBe(baseProps.body.length * baseProps.header.length);
  });

  it("should not render table header", () => {
    wrapper.setProps({ header: null });
    expect(wrapper.find("thead").length).toBe(0);
    expect(wrapper.find("th").length).toBe(0);
  });

  it("should not render table header if header array is empty", () => {
    wrapper.setProps({ header: [] });
    expect(wrapper.find("thead").length).toBe(0);
    expect(wrapper.find("th").length).toBe(0);
  });

  it("should not render table body", () => {
    wrapper.setProps({ body: null });
    expect(wrapper.find("tbody").length).toBe(0);
    expect(wrapper.find("td").length).toBe(0);
  });

  it("should not render table body if body array is empty", () => {
    wrapper.setProps({ body: [] });
    expect(wrapper.find("tbody").length).toBe(0);
    expect(wrapper.find("td").length).toBe(0);
  });
});
