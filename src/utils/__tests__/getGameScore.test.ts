import { Game } from '../../types';
import getGameScore from '../getGameScore';

describe('getGameScore', () => {
	it('Returns 0.5 when game is drawn by repetition', () => {
		const game: Game = {
			rules: 'chess',
			url: 'https://www.chess.com/game/live/11042008561',
			fen: '8/1k1p4/2p1p3/1q6/KQ6/6r1/p7/8 w - -',
			time_class: 'rapid',
			time_control: '600',
			end_time: 1617303826,
			rated: true,
			white: {
				rating: 1335,
				result: 'repetition',
				username: 'badslinkie',
			},
			black: {
				rating: 1305,
				result: 'repetition',
				username: 'lukasgjetting',
			},
			pgn: '',
		};

		expect(getGameScore(game, 'lukasgjetting')).toBe(0.5);
	});

	it('Returns 0.5 when game is drawn by insufficient material', () => {
		const game: Game = {
			rules: 'chess',
			url: 'https://www.chess.com/game/live/11042008561',
			fen: '8/1k1p4/2p1p3/1q6/KQ6/6r1/p7/8 w - -',
			time_class: 'rapid',
			time_control: '600',
			end_time: 1617303826,
			rated: true,
			white: {
				rating: 1335,
				result: 'insufficient',
				username: 'badslinkie',
			},
			black: {
				rating: 1305,
				result: 'insufficient',
				username: 'lukasgjetting',
			},
			pgn: '',
		};

		expect(getGameScore(game, 'lukasgjetting')).toBe(0.5);
	});

	it('Returns 0.5 when game is drawn by agreement', () => {
		const game: Game = {
			rules: 'chess',
			url: 'https://www.chess.com/game/live/11042008561',
			fen: '8/1k1p4/2p1p3/1q6/KQ6/6r1/p7/8 w - -',
			time_class: 'rapid',
			time_control: '600',
			end_time: 1617303826,
			rated: true,
			white: {
				rating: 1335,
				result: 'agreed',
				username: 'badslinkie',
			},
			black: {
				rating: 1305,
				result: 'agreed',
				username: 'lukasgjetting',
			},
			pgn: '',
		};

		expect(getGameScore(game, 'lukasgjetting')).toBe(0.5);
	});

	it('Returns 1 when given username wins by checkmate', () => {
		const game: Game = {
			rules: 'chess',
			url: 'https://www.chess.com/game/live/11042008561',
			fen: '8/1k1p4/2p1p3/1q6/KQ6/6r1/p7/8 w - -',
			time_class: 'rapid',
			time_control: '600',
			end_time: 1617303826,
			rated: true,
			white: {
				rating: 1335,
				result: 'checkmated',
				username: 'badslinkie',
			},
			black: {
				rating: 1305,
				result: 'win',
				username: 'lukasgjetting',
			},
			pgn: '',
		};

		expect(getGameScore(game, 'lukasgjetting')).toBe(1);
	});

	it('Returns 1 when other play wins by timeout', () => {
		const game: Game = {
			rules: 'chess',
			url: 'https://www.chess.com/game/live/11042008561',
			fen: '8/1k1p4/2p1p3/1q6/KQ6/6r1/p7/8 w - -',
			time_class: 'rapid',
			time_control: '600',
			end_time: 1617303826,
			rated: true,
			white: {
				rating: 1335,
				result: 'win',
				username: 'badslinkie',
			},
			black: {
				rating: 1305,
				result: 'timeout',
				username: 'lukasgjetting',
			},
			pgn: '',
		};

		expect(getGameScore(game, 'lukasgjetting')).toBe(0);
	});
});
