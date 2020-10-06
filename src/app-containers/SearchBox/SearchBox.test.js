import React from "react";
import { shallow } from "enzyme";
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Component import:
import SearchBox from "./searchbox";

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

test("value test", () => {
  const wrapper = initialSetup( { value: "Hello World" } );
  const component = findByTestAttr(wrapper, "search-box-container");
  render(component)

  /** @type {HTMLInputElement} */
  let inputEl = ( /** @type {HTMLInputElement} */ ( screen.getByRole('searchbox' ) ) );

  expect(inputEl.value).toBe("Hello World");
})

test("placeholder text test", () => {
  const wrapper = initialSetup( { text: "Test says Enter some text" } );
  const component = findByTestAttr(wrapper, "search-box-container");
  render(component)

  // TODO: It's possible to use JSDoc @type to inform the TypeScript engine about the type. While the TS error
  //  doesn't affect the app, we'll have to keep an eye on this to see if error flags get annoying.
  /** @type {HTMLInputElement} */
  let inputEl = ( /** @type {HTMLInputElement} */ ( screen.getByRole('searchbox' ) ) );

  expect( inputEl.placeholder ).toBe("Test says Enter some text");
})

test("onChange test", () => { //in progress
  let inputValue = null;
  const onChangeFn = ( event ) => inputValue = event.target.value;

  const wrapper = initialSetup( { onChange: onChangeFn } );
  const component = findByTestAttr(wrapper, "search-box-container");
  render(component);

  /** @type {HTMLInputElement} */
  let inputEl = ( /** @type {HTMLInputElement} */ ( screen.getByRole('searchbox' ) ) );

  userEvent.type(inputEl, 'Hello World!') //onChange triggered

  expect( inputValue ).toBe( inputEl.value );
  expect( inputValue ).toBe( "Hello World!" );
})

test("onEnter test", () => { //in progress
  let inputValue = null;
  const onEnterKeyFn = ( event ) => inputValue = event.target.value;

  const wrapper = initialSetup( { onEnterKey: onEnterKeyFn } );
  const component = findByTestAttr(wrapper, "search-box-container");
  render(component)

  /** @type {HTMLInputElement} */
  let inputEl = ( /** @type {HTMLInputElement} */ ( screen.getByRole('searchbox' ) ) );

  userEvent.type(inputEl, 'Hello World!') //onChange triggered

  fireEvent.keyDown( inputEl, { key: "Enter" } ) //onEnter triggered

  expect( inputValue ).toBe( inputEl.value );
  expect( inputValue ).toBe( "Hello World!" );
})
