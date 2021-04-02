export interface GamePlayer {
	username: string;
	rating: number;
	result:
	'win' |
	'checkmated' |
	'resigned' |
	'repetition' |
	'stalemate' |
	'timeout' |
	'insufficient' |
	'abandoned' |
	'agreed' |
	'timevsinsufficient';
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

// API responses
export interface ArchivesListResponse {
	archives: string[];
}

export interface ArchiveGamesResponse {
	games: Game[];
}
