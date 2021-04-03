import { Game } from '../types';
import GameResultChart from './GameResultChart';
import GamesByHourChart from './GamesByHourChart';
import MajorStatsChart from './MajorStatsChart';
import WinRateBlackChart from './WinRateBlackChart';
import WinRateWhiteChart from './WinRateWhiteChart';

type ChartFunction = {
	(games: Game[], username: string): Chart | void,
};

const charts: ChartFunction[] = [
	WinRateWhiteChart,
	WinRateBlackChart,
	GameResultChart,
	GamesByHourChart,
	MajorStatsChart,
];

export default charts;
