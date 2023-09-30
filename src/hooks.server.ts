import type { Handle } from '@sveltejs/kit';
import type { UserInfo } from '$lib/models/UserData';
import { fetcher } from '$lib/utils/api';

export const handle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get("Authorization");

	if (jwt) {
		try {
			const user = await fetcher<UserInfo>('/api/auth/verifyToken', jwt);
			event.locals.user = user;
		} catch (e) {
			console.error(e);
		}
	}

	const response = await resolve(event);
	return response;
};
