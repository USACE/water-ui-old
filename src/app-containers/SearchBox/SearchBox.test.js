import React from "react";
import { shallow } from "enzyme";
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

const typeSetup = (props) => {
  props = {value:"Hello World!", onChange:console.log("onchanged"), onEnterKey:true};
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

test('type', () => {
  const wrapper = typeSetup();
  const component = findByTestAttr(wrapper, "search-box-container");
  render(component)

  //const onChange = jest.fn();

  userEvent.type(screen.getByRole('input'), 'Hello World!,{enter}')
  expect(screen.getByRole('input')).toContain('Hello World!')
  //expect(screen.getByRole('input')).toHaveValue('Hello World!') //cant find toHaveValue function
})
