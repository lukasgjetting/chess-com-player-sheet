export interface GamePlayer {
    username: string;
    rating: number;
    result: 'win' | 'checkmated' | 'resigned' | 'repetition' | 'stalemate' | 'timeout' | 'insufficient' | 'abandoned';
}

export interface Game {
    rules: 'chess' | string;
    url: string;
    white: GamePlayer;
    black: GamePlayer;
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
