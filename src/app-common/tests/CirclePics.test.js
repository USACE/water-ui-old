import React from 'react';
import { shallow } from 'enzyme';
import CirclePics from '../CirclePics';

describe( '<CirclePics />', () => {
  const renderOptions = { disableLifecycleMethods: true };

  const CirclePicArray = [
    { title: 'Water Quality Assessment', imgAlt: 'Card 1 Image', href: '/#link1' },
    { title: 'Water Quality Awareness', imgAlt: 'Card 2 Image', href: '/#link2' },
    { title: 'Water Quality Support', imgAlt: 'Card 3 Image', href: '/#link3' },
  ];

  let wrapper;
  beforeEach( () => {
    wrapper = shallow( <CirclePics cardObj={ CirclePicArray }/>, renderOptions );
  } );

  it( 'should render component', () => {
    expect( wrapper.length ).toBe( 1 );
    expect( wrapper.find( 'a' ).length ).toBe( CirclePicArray.length );
  } );

} );
