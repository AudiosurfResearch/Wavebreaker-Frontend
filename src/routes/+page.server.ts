import { error } from '@sveltejs/kit';
import { isAxiosError } from 'axios';
import type { GetRadioSongsResponse } from '$lib/models/SongData.js';
import { fetcher } from '$lib/api.js';
import { loadMetadata } from '$lib/stores/metadata-store.js';
import type { ServerStats } from '$lib/models/ServerStats.js';
import type { ExtendedScoreInfo } from '$lib/models/ScoreData.js';

export async function load({ locals, cookies }) {
	try {
		const serverStats: Promise<ServerStats> = loadMetadata(fetch, '/api/server/getStats');
		if (locals.user) {
			const authToken = cookies.get('Authorization');
			const radioSongs: Promise<GetRadioSongsResponse> = fetcher(
				'/api/server/getRadioSongs',
				authToken
			);
			const rivalScores: Promise<ExtendedScoreInfo[]> = fetcher(
				'/api/scores/getRivalActivity',
				authToken
			);
			const recentScores = fetcher<ExtendedScoreInfo[]>('/api/scores/getRecentActivity');

			return {
				radioSongs: Promise.resolve(radioSongs),
				rivalScores: Promise.resolve(rivalScores),
				recentScores: Promise.resolve(recentScores),
				serverStats: Promise.resolve(serverStats)
			};
		}
		return {
			radioSongs: undefined,
			rivalScores: undefined,
			recentScores: undefined,
			serverStats: Promise.resolve(serverStats)
		};
	} catch (e) {
		if (isAxiosError(e) && e.response)
			throw error(e.response?.status, { message: e.response.data.error });
		else throw e;
	}
}
