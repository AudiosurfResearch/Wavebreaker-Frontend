import { error } from '@sveltejs/kit';
import { fetcher } from '$lib/api';
import type { ExtendedUserInfo } from '$lib/models/UserData';
import type { GetScoresResponse } from '$lib/models/ScoreData';
import { isAxiosError } from 'axios';

export async function load({ params }) {
	const id: number = +params.id;
	try {
		const userResult: ExtendedUserInfo = await fetcher<ExtendedUserInfo>(
			`/api/users/getUser?id=${id}&getExtendedInfo=true`
		);
		const latestScoresResult: GetScoresResponse = await fetcher<GetScoresResponse>(
			`/api/scores/getScores?userId=${id}`
		);
		const bestScoresResult: GetScoresResponse = await fetcher<GetScoresResponse>(
			`/api/scores/getScores?userId=${id}&scoreSort=desc`
		);

		return {
			userResult,
			latestScoresResult,
			bestScoresResult
		};
	} catch (e) {
		if (isAxiosError(e) && e.response) throw error(e.response?.status, { message: e.response.data.error });
		else throw e;
	}
}
