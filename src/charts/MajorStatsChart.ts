import { Game, PlayerColor } from '../types';
import getFirstMoveString from '../utils/getFirstMoveString';

const MajorStatsChart = (games: Game[], username: string) => {
	const sortedGames = games.sort((a, b) => a.end_time - b.end_time);

	const firstGameDate = new Date(sortedGames[0].end_time * 1000);
	const latestGameDate = new Date(sortedGames[sortedGames.length - 1].end_time * 1000);

	const whiteMostPlayed = getFirstMoveString(games, username, PlayerColor.WHITE);
	const blackMostPlayed = getFirstMoveString(games, username, PlayerColor.BLACK);

	const numberOfGamesElement = document.querySelector<HTMLSpanElement>('#stat-number-of-games');
	const firstGameElement = document.querySelector<HTMLSpanElement>('#stat-first-game');
	const latestGameElement = document.querySelector<HTMLSpanElement>('#stat-latest-game');
	const firstMoveWhiteElement = document.querySelector<HTMLSpanElement>('#stat-first-move-white');
	const firstMoveBlackElement = document.querySelector<HTMLSpanElement>('#stat-first-move-black');

	if (
		numberOfGamesElement == null ||
        firstGameElement == null ||
        latestGameElement == null ||
        firstMoveWhiteElement == null ||
        firstMoveBlackElement == null
	) {
		alert('Could not find statistic elements');

		return;
	}

	numberOfGamesElement.innerHTML = `${games.length}`;
	firstGameElement.innerHTML = firstGameDate.toLocaleDateString();
	latestGameElement.innerHTML = latestGameDate.toLocaleDateString();
	firstMoveWhiteElement.innerHTML = whiteMostPlayed;
	firstMoveBlackElement.innerHTML = blackMostPlayed;
};

export default MajorStatsChart;
