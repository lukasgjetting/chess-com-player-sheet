import { Game } from '../types';

const getGameLength = (game: Game): number => {
	const match = game.pgn.match(/[0-9]+\. /g);

	if (match == null) {
		return 0;
	}

	const lastMatch = match[match.length - 1];

	return Number(lastMatch.replace('. ', ''));
};

export default getGameLength;
