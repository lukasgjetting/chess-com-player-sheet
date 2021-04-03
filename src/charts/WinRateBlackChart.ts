import Chart, { ChartElementsOptions } from 'chart.js';
import { Game } from '../types';
import calculateTotal from '../utils/calculateTotal';
import getGameScore from '../utils/getGameScore';

const WinRateBlackChart = (games: Game[], username: string): Chart => {
	const blackGames = games.filter((g) => g.black.username.toLowerCase() === username.toLowerCase());

	const scores = blackGames.map<number>((g) => getGameScore(g, username));
	const totalScore = calculateTotal(scores);

	const averageScore = totalScore / scores.length;

	const data = [averageScore, 1 - averageScore];

	const elements = {
		center: {
			text: averageScore.toFixed(2),
			textColor: '#DDD',
		},
	} as ChartElementsOptions;

	return new Chart('win-rate-black', {
		type: 'doughnut',
		data: {
			datasets: [{
				data,
				backgroundColor: ['rgb(59, 130, 246)', '#DDD'],
			}],
			labels: ['Win %', 'Loss %'],
		},
		options: {
			cutoutPercentage: 65,
			legend: {
				display: false,
			},
			tooltips: {
				callbacks: {
					label: (context) => data[context.index || 0].toFixed(2),
				},
			},
			elements,
		},
	});
};

export default WinRateBlackChart;
