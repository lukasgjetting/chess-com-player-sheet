import { Game, PlayerColor } from '../types';

interface MoveCount {
	[key: string]: number;
}

const getFirstMoveString = (games: Game[], username: string, color: PlayerColor) => {
	const colorGames = games.filter((g) => (
		g[color].username.toLowerCase() === username.toLowerCase()
	));

	const firstMoves = colorGames.map((g) => {
		const regex = (color === PlayerColor.WHITE ?
			/1\. (.+?) / :
			/1\.\.\. (.+?) /
		);

		const match = g.pgn.match(regex);

		console.log(match);

		if (match == null) {
			return '(none)';
		}

		return match[1];
	});

	console.log(games, username, color, colorGames);

	const moveCounts = firstMoves.reduce<MoveCount>((obj, move) => ({
		...obj,
		[move]: (obj[move] || 0) + 1,
	}), {});

	console.log(moveCounts);

	const sortedMoves = Object.entries(moveCounts).sort((a, b) => b[1] - a[1]);

	if (sortedMoves.length === 0) {
		return '-';
	}

	const mostPlayed = sortedMoves[0][0];
	const whiteMovePercentage = moveCounts[mostPlayed] / colorGames.length;

	return `${mostPlayed} (${Math.round(whiteMovePercentage * 100)}%)`;
};

export default getFirstMoveString;
