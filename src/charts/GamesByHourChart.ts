import Chart from 'chart.js';
import { Game } from '../types';
import calculateTotal from '../utils/calculateTotal';
import getGameScore from '../utils/getGameScore';

const initialData = new Array(24).fill(null).reduce((obj, _, index) => ({
	...obj,
	[index]: [],
}), {});

interface GamesByHour {
	[key: number]: Game[];
}

const GamesByHourChart = (games: Game[], username: string): Chart => {
	const gamesByHour = games.reduce<GamesByHour>((obj, g) => {
		const hour = new Date(g.end_time * 1000).getHours();

		return {
			...obj,
			[hour]: [
				...obj[hour],
				g,
			],
		};
	}, initialData);

	const numberOfGamesData = Object.values(gamesByHour).map((hourGames: Game[]) => (
		hourGames.length
	));
	const averageScoreData = Object.values(gamesByHour).map((hourGames: Game[]) => {
		if (hourGames.length === 0) {
			return 0;
		}

		const gameScores = hourGames.map((g) => getGameScore(g, username));
		const totalScore = calculateTotal(gameScores);

		return Math.round((totalScore / hourGames.length) * 100) / 100;
	});

	return new Chart('games-by-hour', {
		type: 'line',
		data: {
			datasets: [
				{
					label: 'Number of games',
					data: numberOfGamesData,
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					yAxisID: 'numberOfGames',
				},
				{
					label: 'Average score',
					data: averageScoreData,
					fill: false,
					borderColor: 'red',
					yAxisID: 'averageScore',
				},
			],
			labels: Object.keys(gamesByHour),
		},
		options: {
			scales: {
				yAxes: [{
					id: 'numberOfGames',
					type: 'linear',
					position: 'left',
				}, {
					id: 'averageScore',
					type: 'linear',
					position: 'right',
					ticks: {
						max: 1,
						min: 0,
					},
				}],
			},
			legend: {
				position: 'bottom',
			},
		},
	});
};

export default GamesByHourChart;
