import { getGames } from './lib/chess-com-api';
import getGameLength from './utils/getGameLength';
import getGameResult from './utils/getGameResult';

const main = async () => {
	const username = 'lukasgjetting';

	const games = await getGames(username);

	const gamesLength = games.map(getGameLength);
	const gamesScore = games.map((g) => getGameResult(g, username));

	console.log(games.reduce<{ moves: number, score: number }[]>((arr, game, index) => [
		...arr,
		{
			moves: gamesLength[index],
			score: gamesScore[index],
		},
	], []));
};

main();
