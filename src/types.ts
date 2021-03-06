export enum GameResult {
	WIN = 'win',
	CHECKMATED = 'checkmated',
	RESIGNED = 'resigned',
	REPETITION = 'repetition',
	STALEMATE = 'stalemate',
	TIMEOUT = 'timeout',
	INSUFFICIENT = 'insufficient',
	ABANDONED = 'abandoned',
	AGREED = 'agreed',
	TIME_VS_INSUFFICIENT = 'timevsinsufficient',
	FIFTY_MOVE_RULE = '50move',
}

export enum PlayerColor {
	WHITE = 'white',
	BLACK = 'black',
}

export interface GamePlayer {
	username: string;
	rating: number;
	result: GameResult;
}

export interface Game {
	rules: 'chess' | string;
	url: string;
	white: GamePlayer;
	black: GamePlayer;
	pgn: string;
	fen: string;
	time_class: 'blitz' | 'rapid' | 'daily';
	time_control: string;
	end_time: number;
	rated: boolean;
}

export interface ChartEntry {
	x: number;
	y: number;
}

// API responses
export interface ArchivesListResponse {
	archives: string[];
}

export interface ArchiveGamesResponse {
	games: Game[];
}
