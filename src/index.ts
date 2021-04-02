import fetch from 'node-fetch';
import { ArchiveGamesResponse, ArchivesListResponse, Game } from './types';

const API_URL = 'https://api.chess.com/pub';

const sendRequest = async (endpoint: string) => {
	try {
		const response = await fetch(`${API_URL}${endpoint}`);

		return await response.json();
	} catch (e) {
		console.error(`Error for ${endpoint}`, e);
	}
};

const getGames = async (username: string) => {
	const response: ArchivesListResponse = await sendRequest(`/player/${username}/games/archives`);
	const endpoints = response.archives
		.map((url) => url.replace(API_URL, ''))
	// Reverse so they are in reverse chronological order
		.reverse();

	let games: Game[] = [];

	// ESLint doesn't like using async loops
	// However, we need the requests to not run in parallel, due to Chess.com rate limits
	/* eslint-disable no-restricted-syntax */
	for (const endpoint of endpoints) {
		const gamesResponse: ArchiveGamesResponse = await sendRequest(endpoint);

		games = [...games, ...gamesResponse.games];
	}
	/* eslint-enable no-restricted-syntax */

	return games;
};

getGames('lukasgjetting').then(console.log);
