import { Game, GameResult } from '../types';

// Returns 1, 0.5 or 0, based on the result of the game
// From the perspective of the given username
const getGameScore = (game: Game, username: string): number => {
	// If neither player won, it must have been drawn
	if (game.black.result !== GameResult.WIN && game.white.result !== GameResult.WIN) {
		return 0.5;
	}

	if (
		(game.black.result === GameResult.WIN && game.black.username === username) ||
        (game.white.result === GameResult.WIN && game.white.username === username)
	) {
		return 1;
	}

	return 0;
};

export default getGameScore;
