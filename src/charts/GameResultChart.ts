import Chart from 'chart.js';
import { Game, GameResult } from '../types';
import { GameResultLabel } from '../utils/constants';

const colors = [
	'#36a2eb',
	'#ff6484',
	'#ff9f3f',
	'#ffcd56',
	'#4bc0c0',
	'#9967ff',
	'#cacbcf',
	'#93eb36',
	'#eb36d3',
];

type GamesByResult = {
	[key in GameResult]?: Game[];
};

const GameResultChart = (games: Game[]): Chart => {
	const gamesByResult = games.reduce<GamesByResult>((obj, g) => {
		let result;

		// If one of the results is WIN, the other one will be the cause
		if (g.black.result !== GameResult.WIN) {
			result = g.black.result;
		} else {
			result = g.white.result;
		}

		return {
			...obj,
			[result]: [
				...(obj[result] || []),
				g,
			],
		};
	}, {});

	const data = Object.entries(gamesByResult).map(([stringResult, gamesWithResult]) => {
		const result = stringResult as GameResult;

		return {
			result,
			label: GameResultLabel[result],
			numberOfGames: gamesWithResult?.length || 0,
		};
	}).sort((a, b) => b.numberOfGames - a.numberOfGames);

	console.log(data);

	return new Chart('result-by-cause', {
		type: 'doughnut',
		data: {
			datasets: [{
				data: data.map((e) => e.numberOfGames),
				backgroundColor: data.map((e, index) => colors[index % (games.length - 1)]),
			}],
			labels: data.map((e) => e.label),
		},
		options: {
			legend: {
				position: 'left',
				labels: {
					boxWidth: 10,
				},
			},
		},
	});
};

export default GameResultChart;
