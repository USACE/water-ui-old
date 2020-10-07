import React from 'react';
import { shallow } from 'enzyme';

// Component import:
import CirclePics from '../CirclePics';

const CirclePicArray = [
	{ title: 'Water Quality Assessment', imgAlt: 'Card 1 Image', href: '/#link1' },
	{ title: 'Water Quality Awareness', imgAlt: 'Card 2 Image', href: '/#link2' },
	{ title: 'Water Quality Support', imgAlt: 'Card 3 Image', href: '/#link3' },
];

// Set up the component with props:
const initialSetup = () => {
	const wrapper = shallow(<CirclePics cardObj={CirclePicArray} />);
	return wrapper;
};

test('component renders correct number of children', () => {
	const wrapper = initialSetup();
	expect(wrapper.find('a').length).toBe(CirclePicArray.length);
});
