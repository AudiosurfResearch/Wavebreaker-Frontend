import { error } from '@sveltejs/kit';
import { fetcher } from '$lib/api';
import type { ExtendedUserInfo } from '$lib/models/UserData';
import type { GetScoresResponse } from '$lib/models/ScoreData';
import { isAxiosError } from 'axios';

export async function load({ params }) {
	const id: number = +params.id;
	try {
		const userResult = fetcher<ExtendedUserInfo>(
			`/api/users/getUser?id=${id}&getExtendedInfo=true`
		);
		const latestScoresResult = fetcher<GetScoresResponse>(`/api/scores/getScores?userId=${id}`);
		const bestScoresResult = fetcher<GetScoresResponse>(
			`/api/scores/getScores?userId=${id}&scoreSort=desc`
		);

		return {
			userResult: Promise.resolve(userResult),
			latestScoresResult: Promise.resolve(latestScoresResult),
			bestScoresResult: Promise.resolve(bestScoresResult)
		};
	} catch (e) {
		if (isAxiosError(e) && e.response)
			throw error(e.response?.status, { message: e.response.data.error });
		else throw e;
	}
}
