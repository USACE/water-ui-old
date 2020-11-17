import React from "react";
import { shallow } from "enzyme";
import SearchBox from "../SearchBox";

describe( '<SearchBox />', () => {
  const renderOptions = { disableLifecycleMethods: true };

  let wrapper;
  beforeEach( () => {
    wrapper = shallow( <SearchBox/>, renderOptions );
  } );

  it( 'should render component', () => {
    expect( wrapper.length ).toBe( 1 );
  } );

  it( 'should pass value and text props to input', () => {
    wrapper.setProps( {
      value: 'Hello World',
      text: 'Some random text',
    } );
    expect( wrapper.find( 'input' ).prop( 'value' ) ).toBe( 'Hello World' );
    expect( wrapper.find( 'input' ).prop( 'placeholder' ) ).toBe( 'Some random text' );
  } );

  it( 'should handle onChange() passed to props', () => {
    const onChange = jest.fn();
    wrapper.setProps( { onChange } )

    // simulate clicking onChange on the input
    wrapper.find( 'input' ).prop( 'onChange' )( 'testudo' );

    expect( onChange ).toHaveBeenCalledWith( 'testudo' );
  } );

  it( 'should handle onEnterKey() passed to props', () => {
    const onEnterKey = jest.fn();
    wrapper.setProps( { onEnterKey } )

    // simulate clicking onKeyDown with 'Enter' key
    let event = { key: 'Enter' };
    wrapper.find( 'input' ).prop( 'onKeyDown' )( event );

    // should call onEnter if the key is 'Enter'
    expect( onEnterKey ).toHaveBeenCalledTimes( 1 );
    expect( onEnterKey ).toHaveBeenCalledWith( event );

    // simulate clicking onKeyDown with 'Tab' key
    event = { key: 'Tab' };
    wrapper.find( 'input' ).prop( 'onKeyDown' )( event );
    expect( onEnterKey ).toHaveBeenCalledTimes( 1 );
  } );

  it( 'should handle if onChange and onEnterKey are not passed as props', () => {
    wrapper.find( 'input' ).prop( 'onChange' )( 'testudo' );
    wrapper.find( 'input' ).prop( 'onKeyDown' )( { key: 'Enter ' } );
  } );
} );
