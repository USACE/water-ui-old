import React from "react";
import { shallow } from "enzyme";

// Component import:
import Table from "../table/Table";

// utils:
import { findByTestAttr, findByElementType } from "../../testUtils";

// Set up the component with props:
const initialSetup = (props = {}) => {
  const wrapper = shallow(<Table {...props} />);

  return wrapper;
};

test("component renders without error", () => {
  const wrapper = initialSetup();
  const component = findByTestAttr(wrapper, "table-container");
  expect(component.length).toBe(1);
});

test("number of headers match number of column", () => {
  const props = {
    headerRowArr: ["header1", "header2", "header3"],
    rowsArr: [
      ["tableBody1", "tableBody2", "tableBody3"],
      ["tableBody1", "tableBody2", "tableBody3"],
      ["tableBody1", "tableBody2", "tableBody3"],
      ["tableBody1", "tableBody2", "tableBody3"],
    ],
  };
  const wrapper = initialSetup(props);

  const th = findByElementType(wrapper, "th");
  const td = findByElementType(wrapper, "td");
  const tr = findByElementType(wrapper, "tr");

  const numberOfColumns = td.length / (tr.length - 1);
  expect(numberOfColumns).toBe(th.length);
});

describe("table headers renders conditionally", () => {
  test("table headers RENDER when headerRowArr props exist", () => {
    const props = {
      headerRowArr: ["header1", "header2", "header3"],
    };
    const wrapper = initialSetup(props);
    const tHeadTag = findByElementType(wrapper, "thead");
    const th = findByElementType(wrapper, "th");
    const tr = findByElementType(wrapper, "tr");

    // Check for <thead>
    expect(tHeadTag.length).toBe(1);
    // Check for <tr>
    expect(tr.length).toBe(1);
    // Check for <th>
    expect(th.length).toBe(3);
  });
  test("table headers DON'T RENDER when no headerRowArr props exist", () => {
    const props = {};
    const wrapper = initialSetup(props);
    const thead = findByElementType(wrapper, "thead");
    const th = findByElementType(wrapper, "th");
    const tr = findByElementType(wrapper, "tr");

    // Check for <thead>
    expect(thead.length).toBe(0);
    // Check for <tr>
    expect(tr.length).toBe(0);
    // Check for <th>
    expect(th.length).toBe(0);
  });
});

describe("table body renders conditionally", () => {
  test("table body renders when rowsArr props exists", () => {
    const props = {
      rowsArr: [["tableBody1", "tableBody2", "tableBody3"]],
      headerRowArr: ["header1", "header2", "header3"],
    };
    const wrapper = initialSetup(props);
    const tbody = findByElementType(wrapper, "tbody");
    const tr = findByElementType(wrapper, "tr");
    const td = findByElementType(wrapper, "td");

    // Check for <tbody>
    expect(tbody.length).toBe(1);
    // Check for <tr>
    expect(tr.length).toBe(2);
    // Check for <td>
    expect(td.length).toBe(3);
  });
  test("table body DOES NOT render when no rowsArr props exists", () => {
    const props = {};
    const wrapper = initialSetup(props);
    const tBody = findByElementType(wrapper, "tbody");
    const tr = findByElementType(wrapper, "tr");
    const td = findByElementType(wrapper, "td");
    // Check for <tbody>
    expect(tBody.length).toBe(0);
    // Check for <tr>
    expect(tr.length).toBe(0);
    // Check for <td>
    expect(td.length).toBe(0);
  });
});
