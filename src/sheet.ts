import qs from 'qs';
import { getGames } from './lib/chess-com-api';
import charts from './charts';
import './utils/chart-plugins/doughnut-center-text';

const main = async () => {
	const query = qs.parse(window.location.search.replace('?', ''));
	const username = query.u as string;

	const usernameElement = document.querySelector<HTMLSpanElement>('#username');

	if (usernameElement != null) {
		usernameElement.innerHTML = username;
	}

	const allGames = await getGames(username);

	// Only include chess games (not custom modes)
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
