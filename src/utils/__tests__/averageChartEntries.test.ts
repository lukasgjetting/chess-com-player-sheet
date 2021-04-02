import { ChartEntry } from '../../types';
import averageChartEntries from '../averageChartEntries';

describe('averageChartEntries', () => {
	it('Correctly averages chart entries', () => {
		const input: ChartEntry[] = [
			{ x: 1, y: 4 },
			{ x: 1, y: 5 },
			{ x: 1, y: 9 },
			{ x: 1, y: 8 },
			{ x: 2, y: 4 },
			{ x: 2, y: 5 },
			{ x: 5, y: 9 },
			{ x: 5, y: 8 },
			{ x: 5, y: 4 },
		];

		const output: ChartEntry[] = [
			{ x: 1, y: 6.5 },
			{ x: 2, y: 4.5 },
			{ x: 5, y: 7 },
		];

		expect(averageChartEntries(input)).toEqual(output);
	});
});
