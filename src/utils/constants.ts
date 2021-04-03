import { GameResult } from '../types';

type GameResultLabelType = {
	[key in GameResult]: string;
};

export const GameResultLabel: GameResultLabelType = {
	[GameResult.WIN]: 'Win',
	[GameResult.RESIGNED]: 'Resignation',
	[GameResult.REPETITION]: 'Repetition',
	[GameResult.STALEMATE]: 'Stalemate',
	[GameResult.TIMEOUT]: 'Timeout',
	[GameResult.INSUFFICIENT]: 'Insufficient Material',
	[GameResult.AGREED]: 'Draw by Agreement',
	[GameResult.TIME_VS_INSUFFICIENT]: 'Time vs Insufficient Material',
	[GameResult.CHECKMATED]: 'Checkmate',
	[GameResult.ABANDONED]: 'Game abandoned',
	[GameResult.FIFTY_MOVE_RULE]: 'Fifty-move rule',
};
