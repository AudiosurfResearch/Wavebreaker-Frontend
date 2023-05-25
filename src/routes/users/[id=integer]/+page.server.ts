import { error } from '@sveltejs/kit';
import { poster } from '$lib/api';
import type { ExtendedUserInfo } from '$lib/models/UserData';

export async function load({ params }) {
	const id: number = +params.id;
	try {
		const userResult = await poster<ExtendedUserInfo>('/api/users/getUser', {
			id: id,
			getExtendedInfo: true
		});

		return {
			userResult
		};
	} catch (e) {
		throw error(404, { message: 'User not found' });
	}
}
