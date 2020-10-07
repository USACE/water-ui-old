import React from 'react';
import { shallow } from 'enzyme';
import Cards from '../Cards';

describe( '<Cards />', () => {
  const renderOptions = { disableLifecycleMethods: true };

  const CardsArray = [
    { title: 'Locations', text: 'Card 1 Text', imgAlt: 'Card 1 Image', href: '/locations' },
    { title: 'Data Resources', text: 'Card 2 Text', imgAlt: 'Card 2 Image', href: '/data-resources' },
    { title: 'Reports', text: 'Card 3 Text', imgAlt: 'Card 3 Image', href: '/reports' },
    { title: 'Reports', text: 'Card 3 Text', imgAlt: 'Card 3 Image', href: '/reports' },
  ];

  let wrapper;
  beforeEach( () => {
    wrapper = shallow( <Cards cardObj={ CardsArray }/>, renderOptions );
  } );

  it( 'should render component', () => {
    expect( wrapper.length ).toBe( 1 );
    expect( wrapper.find( 'a' ).length ).toBe( CardsArray.length );
  } );

} );
