import { Game, PlayerColor } from '../types';
import getFirstMoveString from '../utils/getFirstMoveString';

const MajorStatsChart = (games: Game[], username: string) => {
	const sortedGames = games.sort((a, b) => a.end_time - b.end_time);

	const firstGameDate = new Date(sortedGames[0].end_time * 1000);
	const latestGameDate = new Date(sortedGames[sortedGames.length - 1].end_time * 1000);

	const whiteMostPlayed = getFirstMoveString(games, username, PlayerColor.WHITE);
	const blackMostPlayed = getFirstMoveString(games, username, PlayerColor.BLACK);

	const numberOfGamesElement = document.querySelector('#stat-number-of-games') as HTMLSpanElement;
	const firstGameElement = document.querySelector('#stat-first-game') as HTMLSpanElement;
	const latestGameElement = document.querySelector('#stat-latest-game') as HTMLSpanElement;
	const firstMoveWhiteElement = document.querySelector('#stat-first-move-white') as HTMLSpanElement;
	const firstMoveBlackElement = document.querySelector('#stat-first-move-black') as HTMLSpanElement;

	numberOfGamesElement.innerHTML = `${games.length}`;
	firstGameElement.innerHTML = firstGameDate.toLocaleDateString();
	latestGameElement.innerHTML = latestGameDate.toLocaleDateString();
	firstMoveWhiteElement.innerHTML = whiteMostPlayed;
	firstMoveBlackElement.innerHTML = blackMostPlayed;
};

export default MajorStatsChart;
