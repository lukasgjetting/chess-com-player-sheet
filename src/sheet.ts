import qs from 'qs';
import { getGames } from './lib/chess-com-api';
import charts from './charts';
import './utils/chart-plugins/doughnut-center-text';

const main = async () => {
	const query = qs.parse(window.location.search.replace('?', ''));
	const username = query.u as string;

	const containerElement = document.querySelector('#container') as HTMLDivElement;
	const usernameElement = document.querySelector('#username') as HTMLSpanElement;
	const generatedDateElement = document.querySelector('#generated-date') as HTMLSpanElement;
	const progressElement = document.querySelector('#loading-progress') as HTMLSpanElement;
	const totalElement = document.querySelector('#loading-total') as HTMLSpanElement;
	const currentMonthElement = document.querySelector('#loading-month') as HTMLSpanElement;

	usernameElement.innerHTML = username;
	generatedDateElement.innerHTML = new Date().toLocaleDateString();

	const allGames = await getGames(username, ({ progress, total, currentMonth }) => {
		progressElement.innerHTML = progress.toString();
		totalElement.innerHTML = total.toString();
		currentMonthElement.innerHTML = currentMonth;
	});

	containerElement.classList.remove('loading');

	// Only include chess games (not custom modes)
	const games = allGames.filter((g) => g.rules === 'chess');

	// Initialize all charts
	charts.forEach((c) => c(games, username));
};

main();
