import React from "react";
import { shallow } from "enzyme";
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Component import:
import SearchBox from "./index";

// Utils:
import { findByTestAttr } from "../../testUtils";

// Set up the component with props:
const initialSetup = (props) => {
  props = {value:"valuetest", onChange: () => console.log("onChanged"), onEnterKey: () => console.log("Enter Pressed"), text:"placeholdertext"};
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

test("value test", () => {
  const wrapper = initialSetup();
  const component = findByTestAttr(wrapper, "search-box-container");
  render(component)
  let inputEl = screen.getByDisplayValue('valuetest');
  expect(inputEl).not.toBe(null)
})

test("placeholder text test", () => {
  const wrapper = initialSetup();
  const component = findByTestAttr(wrapper, "search-box-container");
  render(component)
  let placeholderTextEl = screen.getByPlaceholderText('placeholdertext');
  expect(placeholderTextEl).not.toBe(null)
})

test("onChange test", () => { //in progress
  const wrapper = initialSetup();
  const component = findByTestAttr(wrapper, "search-box-container");
  render(component)
  let inputEl = screen.getByRole('input')
  userEvent.type(inputEl, 'Hello World!') //onChange triggered
})

test("onEnter test", () => { //in progress
  const wrapper = initialSetup();
  const component = findByTestAttr(wrapper, "search-box-container");
  render(component)
  let inputEl = screen.getByRole('input')
  fireEvent.keyDown( inputEl, { key: "Enter" } ) //onEnter triggered
})
