import Chart from 'chart.js';
import { Game } from '../types';
import calculateTotal from '../utils/calculateTotal';
import getGameScore from '../utils/getGameScore';

const WinRateBlackChart = (games: Game[], username: string) => {
	const blackGames = games.filter((g) => g.black.username === username);

	const scores = blackGames.map<number>((g) => getGameScore(g, username));
	const totalScore = calculateTotal(scores);

	const averageScore = totalScore / scores.length;

	const data = [averageScore, 1 - averageScore];

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
			legend: {
				display: false,
			},
			tooltips: {
				callbacks: {
					label: (context) => `${Math.round(data[context.index || 0] * 100)}%`,
				},
			},
		},
	});
};

export default WinRateBlackChart;
