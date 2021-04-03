import qs from 'qs';
import { getGames } from './lib/chess-com-api';
import charts from './charts';
import './utils/chart-plugins/doughnut-center-text';
import { Game } from './types';

const main = async () => {
	const query = qs.parse(window.location.search.replace('?', ''));
	const username = query.u as string;

	let currentCharts: (Chart | void)[] = [];
	let latestRender = 0;

	const renderCharts = (games: Game[]) => {
		if (
			games.length === 0 ||
			Date.now() - latestRender < 5000
		) {
			return;
		}

		latestRender = Date.now();

		// Only include chess games (not custom modes)
		const filteredGames = games.filter((g) => g.rules === 'chess');

		// Destroy existing charts (applicable if re-rendering)
		currentCharts.forEach((c) => {
			if (c == null) {
				return;
			}

			c.destroy();
		});

		// Initialize all charts
		currentCharts = charts.map((c) => c(filteredGames, username));
	};

	const containerElement = document.querySelector('#container') as HTMLDivElement;
	const usernameElement = document.querySelector('#username') as HTMLSpanElement;
	const generatedDateElement = document.querySelector('#generated-date') as HTMLSpanElement;
	const progressElement = document.querySelector('#loading-progress') as HTMLSpanElement;
	const totalElement = document.querySelector('#loading-total') as HTMLSpanElement;
	const currentMonthElement = document.querySelector('#loading-month') as HTMLSpanElement;

	const previewButton = document.querySelector('#preview-button') as HTMLButtonElement;

	previewButton.addEventListener('click', () => {
		containerElement.classList.toggle('preview');
	});

	usernameElement.innerHTML = username;
	generatedDateElement.innerHTML = new Date().toLocaleDateString();

	const allGames = await getGames(username, ({
		progress,
		total,
		currentMonth,
		games,
	}) => {
		progressElement.innerHTML = progress.toString();
		totalElement.innerHTML = total.toString();
		currentMonthElement.innerHTML = currentMonth;

		renderCharts(games);
	});

	renderCharts(allGames);

	containerElement.classList.remove('loading', 'preview');
};

main();
