import fetch from 'node-fetch';
import { ArchiveGamesResponse, ArchivesListResponse, Game } from './types';

const API_URL = 'https://api.chess.com/pub';

const sendRequest = async (endpoint: string) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);

        return response.json();
    } catch (e) {
        console.error(`Error for ${endpoint}`, e);
    }
};

const getGames = async (username: string) => {
    const response: ArchivesListResponse = await sendRequest(`/player/${username}/games/archives`);
    const endpoints = response.archives
        .map((url) => url.replace(API_URL, ''))
        // Reverse so they are in reverse chronological order
        .reverse();

    let games: Game[] = [];

    for (const endpoint of endpoints) {
        const gamesResponse: ArchiveGamesResponse = await sendRequest(endpoint);

        games = [...games, ...gamesResponse.games];
    }

    return games;
};

getGames('lukasgjetting').then(console.log)