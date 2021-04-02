import { ChartEntry } from '../types';
import calculateTotal from './calculateTotal';

interface EntryGroup {
	[key: number]: number[];
}

const averageChartEntries = (entries: ChartEntry[]) : ChartEntry[] => {
	const groups: EntryGroup = entries.reduce<EntryGroup>((obj, entry) => ({
		...obj,
		[entry.x]: [
			...(obj[entry.x] || []),
			entry.y,
		],
	}), {});

	const result = Object.entries(groups).map<ChartEntry>(([x, values]) => ({
		x: Number(x),
		y: values.length === 0 ? 0 : calculateTotal(values) / values.length,
	}));

	return result;
};

export default averageChartEntries;
