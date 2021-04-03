import qs from 'qs';
import Chart from 'chart.js';
import { getGames } from './lib/chess-com-api';
import { ChartEntry } from './types';
import averageChartEntries from './utils/averageChartEntries';
import getGameLength from './utils/getGameLength';
import getGameScore from './utils/getGameScore';
import charts from './charts';

const main = async () => {
	const query = qs.parse(window.location.search.replace('?', ''));
	const username = query.u as string;

	console.log('Getting games...');
	const allGames = await getGames(username);
	console.log('Got agmes', allGames);
	const games = allGames.filter((g) => g.rules === 'chess');

	// Initialize all charts
	charts.forEach((c) => c(games, username));

	/*
	const gamesLength = games.map(getGameLength);
	const gamesScore = games.map((g) => getGameScore(g, username));

	const scoreByMoves = games.reduce<ChartEntry[]>((arr, game, index) => [
		...arr,
		{
			x: gamesLength[index],
			y: gamesScore[index],
		},
	], []);

	new Chart('chart-canvas', {
		type: 'line',
		data: {
			datasets: [{
				label: 'Score',
				data: averageChartEntries(scoreByMoves),
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
			}],
		},
		options: {
			scales: {
				xAxes: [{
					type: 'linear',
				}],
			},
		},
	});
    */
};

main();
