import { ArchiveGamesResponse, ArchivesListResponse, Game } from '../types';

const API_URL = 'https://api.chess.com/pub';

const sendRequest = async (endpoint: string) => {
	try {
		const response = await fetch(`${API_URL}${endpoint}`);

		return await response.json();
	} catch (e) {
		console.error(`Error for ${endpoint}`, e);

		throw e;
	}
};

export interface ProgressParameters {
	progress: number;
	total: number;
	currentMonth: string;
	games: Game[];
}

export const getGames = async (
	username: string,
	progressCallback: (parameters: ProgressParameters) => void,
) => {
	const response: ArchivesListResponse = await sendRequest(`/player/${username}/games/archives`);
	const endpoints = response.archives
		.map((url) => url.replace(API_URL, ''))
	// Reverse so they are in reverse chronological order
		.reverse();

	let games: Game[] = [];

	progressCallback({
		progress: 0,
		total: endpoints.length,
		currentMonth: endpoints[0].split('/games/')[1],
		games: [],
	});

	// ESLint doesn't like using async loops
	// However, we need the requests to not run in parallel, due to Chess.com rate limits
	/* eslint-disable no-restricted-syntax */
	for (let i = 0; i < endpoints.length; i++) {
		const endpoint = endpoints[i];

		const gamesResponse: ArchiveGamesResponse = await sendRequest(endpoint);

		games = [...games, ...gamesResponse.games];

		progressCallback({
			progress: i,
			total: endpoints.length,
			currentMonth: endpoint.split('/games/')[1],
			games,
		});
	}
	/* eslint-enable no-restricted-syntax */

	return games;
};
