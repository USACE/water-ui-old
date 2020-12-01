import React from "react";
import { shallow } from "enzyme";
import Table from "../table/Table";

describe("<Table />", () => {
  const renderOptions = { disableLifecycleMethods: true };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Table />, renderOptions);
  });

  it("component renders without error", () => {
    expect(wrapper.length).toBe(1);
  });

  it("number of headers match number of column", () => {
    wrapper.setProps({
      headerRowArr: ["header1", "header2", "header3"],
      rowsArr: [
        ["tableBody1", "tableBody2", "tableBody3"],
        ["tableBody1", "tableBody2", "tableBody3"],
        ["tableBody1", "tableBody2", "tableBody3"],
        ["tableBody1", "tableBody2", "tableBody3"],
      ],
    });
    const th = wrapper.find("th");
    const td = wrapper.find("td");
    const tr = wrapper.find("tr");

    const numberOfColumns = td.length / (tr.length - 1);
    expect(numberOfColumns).toBe(th.length);
  });

  it("table headers renders conditionally", () => {
    wrapper.setProps({
      headerRowArr: ["header1", "header2", "header3"],
      rowsArr: [
        ["tableBody1", "tableBody2", "tableBody3"],
        ["tableBody1", "tableBody2", "tableBody3"],
        ["tableBody1", "tableBody2", "tableBody3"],
        ["tableBody1", "tableBody2", "tableBody3"],
      ],
    });

    const tHeadTag = wrapper.find("thead");
    const th = wrapper.find("th");
    const tr = wrapper.find("tr");

    // Check for <thead>
    expect(tHeadTag.length).toBe(1);
    // Check for <tr>
    expect(tr.length).toBe(5);
    // Check for <th>
    expect(th.length).toBe(3);
  });

  it("table headers DON'T RENDER when no headerRowArr props exist", () => {
    const thead = wrapper.find("thead");
    const th = wrapper.find("th");
    const tr = wrapper.find("tr");

    // Check for <thead>
    expect(thead.length).toBe(0);
    // Check for <tr>
    expect(tr.length).toBe(0);
    // Check for <th>
    expect(th.length).toBe(0);
  });

  it("table body renders when rowsArr props exists", () => {
    wrapper.setProps({
      headerRowArr: ["header1", "header2", "header3"],
      rowsArr: [
        ["tableBody1", "tableBody2", "tableBody3"],
        ["tableBody1", "tableBody2", "tableBody3"],
        ["tableBody1", "tableBody2", "tableBody3"],
        ["tableBody1", "tableBody2", "tableBody3"],
      ],
    });

    const tbody = wrapper.find("tbody");
    const tr = wrapper.find("tr");
    const td = wrapper.find("td");

    // Check for <tbody>
    expect(tbody.length).toBe(1);
    // Check for <tr>
    expect(tr.length).toBe(5);
    // Check for <td>
    expect(td.length).toBe(12);
  });

  it("table body DOES NOT render when no rowsArr props exists", () => {
    const tBody = wrapper.find("tbody");
    const tr = wrapper.find("tr");
    const td = wrapper.find("td");
    // Check for <tbody>
    expect(tBody.length).toBe(0);
    // Check for <tr>
    expect(tr.length).toBe(0);
    // Check for <td>
    expect(td.length).toBe(0);
  });
});
