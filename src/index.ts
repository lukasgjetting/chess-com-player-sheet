import Chart from 'chart.js';
import { getGames } from './lib/chess-com-api';
import { ChartEntry } from './types';
import averageChartEntries from './utils/averageChartEntries';
import getGameLength from './utils/getGameLength';
import getGameResult from './utils/getGameResult';

const main = async () => {
	const username = 'lukasgjetting';

	const games = await getGames(username);

	const gamesLength = games.map(getGameLength);
	const gamesScore = games.map((g) => getGameResult(g, username));

	const movesScore = games.reduce<ChartEntry[]>((arr, game, index) => [
		...arr,
		{
			x: gamesLength[index],
			y: gamesScore[index],
		},
	], []);

	console.log('chart', movesScore);

	const chart = new Chart('chart-canvas', {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Score / Number of Moves',
				data: averageChartEntries(movesScore),
			}],
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
					},
				}],
			},
		},
	});
};

console.log(document.querySelector('#chart'));

main();
