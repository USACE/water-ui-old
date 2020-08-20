import React from 'react';
import { shallow } from 'enzyme';

// Component import:
import Cards from './index';

const CardsArray = [
	{ title: 'Locations', text: 'Card 1 Text', imgAlt: 'Card 1 Image', href: '/locations' },
	{ title: 'Data Resources', text: 'Card 2 Text', imgAlt: 'Card 2 Image', href: '/data-resources' },
	{ title: 'Reports', text: 'Card 3 Text', imgAlt: 'Card 3 Image', href: '/reports' },
];

// Set up the component with props:
const initialSetup = () => {
	const wrapper = shallow(<Cards cardObj={CardsArray} />);
	return wrapper;
};

test('component renders correct number of children', () => {
	const wrapper = initialSetup();
	expect(wrapper.find('a').length).toBe(CardsArray.length);
});
