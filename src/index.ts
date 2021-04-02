import fetch from 'node-fetch';
import { ArchiveGamesResponse, ArchivesListResponse, Game } from './types';

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

const getGameLength = (game: Game): number => {
	const match = game.pgn.match(/[0-9]+\. /g);

	if (match == null) {
		return 0;
	}

	const lastMatch = match[match.length - 1];

	return Number(lastMatch.replace('. ', ''));
};

// Returns 1, 0.5 or 0, based on the result of the game
// From the perspective of the given username
const getGameResultScore = (game: Game, username: string): number => {
	// If neither player won, it must have been drawn
	if (game.black.result !== 'win' && game.white.result !== 'win') {
		return 0.5;
	}

	if (
		(game.black.result === 'win' && game.black.username === username) ||
        (game.white.result === 'win' && game.white.username === username)
	) {
		return 1;
	}

	return 0;
};

const main = async () => {
	const username = 'lukasgjetting';

	const games = await getGames(username);

	const gamesLength = games.map(getGameLength);
	const gamesScore = games.map((g) => getGameResultScore(g, username));

	console.log(games.reduce<{ moves: number, score: number }[]>((arr, game, index) => [
		...arr,
		{
			moves: gamesLength[index],
			score: gamesScore[index],
		},
	], []));
};

main();
