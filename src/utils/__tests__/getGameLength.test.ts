import { Game } from '../../types';
import getGameLength from '../getGameLength';
import { uglifyPgn } from '../tests';

describe('getGameLength', () => {
	it('Returns correct game when black makes last move', () => {
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
				result: 'resigned',
				username: 'badslinkie',
			},
			black: {
				rating: 1305,
				result: 'win',
				username: 'lukasgjetting',
			},
			pgn: uglifyPgn(`
                [Event "Live Chess"]
                [Site "Chess.com"]
                1. e4 {[%clk 0:10:00]} 1... e6 {[%clk 0:10:00]}
                2. b3 {[%clk 0:09:54.4]} 2... b6 {[%clk 0:09:58.5]}
                3. Bb2 {[%clk 0:09:52.9]} 3... Bb7 {[%clk 0:09:57.1]}
                4. Nc3 {[%clk 0:09:44.7]} 4... Nf6 {[%clk 0:09:46.5]}
                5. Bc4 {[%clk 0:09:38.5]} 5... Nxe4 {[%clk 0:09:33.5]}
                6. Qe2 {[%clk 0:09:27.5]} 6... Nxc3 {[%clk 0:09:21.7]}
                7. Bxc3 {[%clk 0:09:26.4]} 7... Bxg2 {[%clk 0:09:17.4]}
                8. O-O-O {[%clk 0:08:57.9]} 8... Bxh1 {[%clk 0:09:14.8]}
                9. Nf3 {[%clk 0:08:56.5]} 9... Bxf3 {[%clk 0:09:07.8]}
                10. Qxf3 {[%clk 0:08:55.2]} 10... c6 {[%clk 0:08:18.8]}
                11. Rg1 {[%clk 0:08:52.5]} 11... Rg8 {[%clk 0:07:52.9]}
                0-1
            `),
		};

		expect(getGameLength(game)).toBe(11);
	});

	it('Returns correct game when white makes last move', () => {
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
				result: 'resigned',
				username: 'badslinkie',
			},
			black: {
				rating: 1305,
				result: 'win',
				username: 'lukasgjetting',
			},
			pgn: uglifyPgn(`
                [Event "Live Chess"]
                [Site "Chess.com"]
                1. e4 {[%clk 0:10:00]} 1... e6 {[%clk 0:10:00]}
                2. b3 {[%clk 0:09:54.4]} 2... b6 {[%clk 0:09:58.5]}
                3. Bb2 {[%clk 0:09:52.9]} 3... Bb7 {[%clk 0:09:57.1]}
                4. Nc3 {[%clk 0:09:44.7]} 4... Nf6 {[%clk 0:09:46.5]}
                5. Bc4 {[%clk 0:09:38.5]} 5... Nxe4 {[%clk 0:09:33.5]}
                6. Qe2 {[%clk 0:09:27.5]} 6... Nxc3 {[%clk 0:09:21.7]}
                7. Bxc3 {[%clk 0:09:26.4]}
                0-1
            `),
		};

		expect(getGameLength(game)).toBe(7);
	});
});
