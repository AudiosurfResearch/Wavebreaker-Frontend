import { error } from '@sveltejs/kit';
import { fetcher } from '$lib/api';
import type { UserInfo } from '$lib/models/UserData';

export async function load({ params }) {
	const id: number = +params.id;
	const userResult = await fetcher<UserInfo>(`/api/users/getUser/${id}`);

	if (userResult) {
		return {
			userResult
		};
	}

	throw error(404, { message: 'User not found' });
}
