import { Game } from '../types';

// Returns 1, 0.5 or 0, based on the result of the game
// From the perspective of the given username
const getGameResult = (game: Game, username: string): number => {
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

export default getGameResult;
