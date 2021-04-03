import Chart, { ChartElementsOptions } from 'chart.js';
import { Game } from '../types';
import calculateTotal from '../utils/calculateTotal';
import getGameScore from '../utils/getGameScore';

const WinRateWhiteChart = (games: Game[], username: string): Chart => {
	const whiteGames = games.filter((g) => g.white.username.toLowerCase() === username.toLowerCase());

	const scores = whiteGames.map<number>((g) => getGameScore(g, username));
	const totalScore = calculateTotal(scores);

	const averageScore = totalScore / scores.length;

	const data = [averageScore, 1 - averageScore];

	const elements = {
		center: {
			text: averageScore.toFixed(2),
			textColor: '#333',
		},
	} as ChartElementsOptions;

	return new Chart('win-rate-white', {
		type: 'doughnut',
		data: {
			datasets: [{
				data,
				backgroundColor: ['rgb(59, 130, 246)', '#DDD'],
			}],
			labels: ['Win %', 'Loss %'],
		},
		options: {
			cutoutPercentage: 60,
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

export default WinRateWhiteChart;
