import React from "react";
import { shallow } from "enzyme";
import Footer from "../Footer";

describe( '<Footer />', () => {
  const renderOptions = { disableLifecycleMethods: true };

  let wrapper;
  beforeEach( () => {
    wrapper = shallow( <Footer />, renderOptions );
  } );

  it( 'should render component', () => {
    expect( wrapper.length ).toBe( 1 );
  } );

} );
