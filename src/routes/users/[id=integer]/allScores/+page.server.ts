import type { UserInfo } from '$lib/models/UserData.js';
import { loadMetadata } from '$lib/stores/metadata-store';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const id: number = +params.id;
	const userResult: UserInfo = await loadMetadata(fetch, `/api/users/getUser?id=${id}`);

    if (!userResult) {
		throw error(404, 'User not found');
	}

	return {
		userResult: userResult
	};
}
