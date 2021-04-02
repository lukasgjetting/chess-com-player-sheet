// Takes a prettified PGN and makes it look like what we get from Chess.com API
export const uglifyPgn = (pgn: string) => (
	pgn
		.replace('\n', '')
		.replace(/{t+/g, ' ')
);
