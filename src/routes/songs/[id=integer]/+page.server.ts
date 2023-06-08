import { error } from '@sveltejs/kit';
import { fetcher, poster } from '$lib/api';
import { isAxiosError } from 'axios';
import type { Song } from '$lib/models/SongData.js';
import type { Actions } from './$types';

export async function load({ params }) {
	const id: number = +params.id;
	try {
		const songResult: Song = await fetcher<Song>(`/api/songs/getSong?id=${id}`);

		return {
			songResult
		};
	} catch (e) {
		if (isAxiosError(e) && e.response)
			throw error(e.response?.status, { message: e.response.data.error });
		else throw e;
	}
}

export const actions = {
	reportMetadata: async ({ request, cookies, params }) => {
		const data = await request.formData();
		const additionalInfo = data.get('additionalInfo');
		const songId: number = +params.id;
		const authToken = cookies.get('Authorization');
		//TODO: Implement endpoint in backend!!
		poster("/api/songs/reportMetadata", { songId, additionalInfo }, authToken)

		return { success: true };
	}
} satisfies Actions;
