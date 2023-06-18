import { error } from '@sveltejs/kit';
import { isAxiosError } from 'axios';
import type { GetRadioSongsResponse } from '$lib/models/SongData.js';
import { fetcher } from '$lib/api.js';

export async function load({ locals }) {
	try {
		if (locals.user) {
			const radioSongs: Promise<GetRadioSongsResponse> = fetcher(
				'/api/server/getRadioSongs',
				undefined,
				{ withCredentials: true }
			);
			return {
				radioSongs: Promise.resolve(radioSongs)
			};
		}
        return {
            radioSongs: undefined
        }
	} catch (e) {
		if (isAxiosError(e) && e.response)
			throw error(e.response?.status, { message: e.response.data.error });
		else throw e;
	}
}
