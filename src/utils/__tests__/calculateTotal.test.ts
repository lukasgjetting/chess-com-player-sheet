import calculateTotal from '../calculateTotal';

describe('calculateTotal', () => {
	it('Correctly calculates total of numbers', () => {
		const input = [4, 9, 3, 6];

		expect(calculateTotal(input)).toBe(22);
	});
});
