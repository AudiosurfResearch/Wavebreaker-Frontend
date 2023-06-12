import { error, type Actions, fail } from '@sveltejs/kit';
import type { ExtendedUserInfo, GetOwnRivalsResponse, IsRivalResponse } from '$lib/models/UserData';
import type { GetScoresResponse } from '$lib/models/ScoreData';
import { loadMetadata } from '$lib/stores/metadata-store';
import { fetcher, poster } from '$lib/api.js';
import { isAxiosError } from 'axios';

export async function load({ params, cookies, locals }) {
	const id: number = +params.id;
	const userResult: ExtendedUserInfo = await loadMetadata(fetch, `/api/users/getUser?id=${id}&getExtendedInfo=true`);

	if (!userResult) {
		console.log('User not found');
		throw error(404, 'User not found');
	}

	const latestScoresPromise: Promise<GetScoresResponse> = loadMetadata(
		fetch,
		`/api/scores/getScores?userId=${id}`
	);
	const bestScoresPromise: Promise<GetScoresResponse> = loadMetadata(
		fetch,
		`/api/scores/getScores?userId=${id}&scoreSort=desc`
	);

	let rivalsAndChallengersPromise: Promise<GetOwnRivalsResponse>;
	let isRivalPromise: Promise<IsRivalResponse>;
	if (locals.user && locals.user.id == parseInt(params.id)) {
		const authCookie = cookies.get('Authorization');
		rivalsAndChallengersPromise = fetcher(`/api/users/getOwnRivals`, authCookie);
	} else if (locals.user) {
		const authCookie = cookies.get('Authorization');
		fetcher<IsRivalResponse>(`/api/users/isRival?id=${locals.user.id}`, authCookie);
	}

	return {
		userResult,
		latestScoresResult: Promise.resolve(latestScoresPromise),
		bestScoresResult: Promise.resolve(bestScoresPromise),
		rivalsAndChallengers: Promise.resolve(rivalsAndChallengersPromise),
		isRivalResponse: Promise.resolve(isRivalPromise)
	};
}

export const actions = {
	addRival: async ({ cookies, params }) => {
		const id: number = +params.id;
		const authToken = cookies.get('Authorization');

		try {
			await poster('/api/users/addRival', { id }, authToken);
		} catch (e) {
			if (isAxiosError(e) && e.response)
				return fail(e.response?.status, { message: e.response.data.error });
		}
		return { success: true };
	},
	removeRival: async ({ cookies, params }) => {
		const id: number = +params.id;
		const authToken = cookies.get('Authorization');

		try {
			await poster('/api/users/removeRival', { id }, authToken);
		} catch (e) {
			if (isAxiosError(e) && e.response)
				return fail(e.response?.status, { message: e.response.data.error });
		}
		return { success: true };
	}
} satisfies Actions;
