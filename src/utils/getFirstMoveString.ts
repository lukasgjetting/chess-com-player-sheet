import { Game, PlayerColor } from '../types';

interface MoveCount {
	[key: string]: number;
}

const getFirstMoveString = (games: Game[], username: string, color: PlayerColor) => {
	const colorGames = games.filter((g) => g[color].username === username);
	const firstMoves = colorGames.map((g) => {
		const regex = (color === PlayerColor.WHITE ?
			/1\. (.+?) / :
			/1\.\.\. (.+?) /
		);

		const match = g.pgn.match(regex);

		if (match == null) {
			return '(none)';
		}

		return match[1];
	});

	const moveCounts = firstMoves.reduce<MoveCount>((obj, move) => ({
		...obj,
		[move]: (obj[move] || 0) + 1,
	}), {});

	const sortedWhite = Object.entries(moveCounts).sort((a, b) => b[1] - a[1]);
	const mostPlayedWhite = sortedWhite[0][0];
	const whiteMovePercentage = moveCounts[mostPlayedWhite] / colorGames.length;

	return `${mostPlayedWhite} (${Math.round(whiteMovePercentage * 100)}%)`;
};

export default getFirstMoveString;
