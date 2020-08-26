import { isValidArrWithValues } from './functions';

describe('isValidArrWithValues', () => {
	test('if VALID arr is passed in', () => {
		const validArr = [{ hello: 'yess??' }];

		expect(isValidArrWithValues(validArr)).toBe(true);
	});
	test('if INVALID arr is passed in', () => {
		const invalidData1 = [];
		const invalidData2 = { something: 'something' };

		expect(isValidArrWithValues(invalidData1)).toBe(false);
		expect(isValidArrWithValues(invalidData2)).toBe(false);
	});
	test('if no props passed in', () => {
		expect(isValidArrWithValues()).toBe(false);
	});
});
