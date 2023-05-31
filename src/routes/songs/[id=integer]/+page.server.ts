import { error } from '@sveltejs/kit';
import { fetcher } from '$lib/api';
import { isAxiosError } from 'axios';
import type { Song } from '$lib/models/SongData.js';

export async function load({ params }) {
	const id: number = +params.id;
	try {
		const songResult: Song = await fetcher<Song>(
			`/api/songs/getSong?id=${id}`
		);

		return {
			songResult
		};
	} catch (e) {
		if (isAxiosError(e) && e.response) throw error(e.response?.status, { message: e.response.data.error });
		else throw e;
	}
}
