import { error } from '@sveltejs/kit';
import { isAxiosError } from 'axios';
import type { GetRadioSongsResponse } from '$lib/models/SongData.js';
import { fetcher } from '$lib/api.js';

export async function load({ locals, cookies }) {
	try {
		if (locals.user) {
			const authToken = cookies.get('Authorization');
			const radioSongs: Promise<GetRadioSongsResponse> = fetcher(
				'/api/server/getRadioSongs',
				authToken,
			);
			return {
				radioSongs: Promise.resolve(radioSongs)
			};
		}
		return {
			radioSongs: undefined
		};
	} catch (e) {
		if (isAxiosError(e) && e.response)
			throw error(e.response?.status, { message: e.response.data.error });
		else throw e;
	}
}
