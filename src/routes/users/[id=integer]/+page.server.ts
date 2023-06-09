import { error } from '@sveltejs/kit';
import type { ExtendedUserInfo } from '$lib/models/UserData';
import type { GetScoresResponse } from '$lib/models/ScoreData';
import { loadMetadata } from '$lib/stores/metadata-store';

export async function load({ params }) {
	const id: number = +params.id;
	const userResult: ExtendedUserInfo = await loadMetadata(
		fetch,
		`/api/users/getUser?id=${id}&getExtendedInfo=true`
	);

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

	return {
		userResult,
		latestScoresResult: Promise.resolve(latestScoresPromise),
		bestScoresResult: Promise.resolve(bestScoresPromise)
	};
}
