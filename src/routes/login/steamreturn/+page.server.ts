import { dev } from '$app/environment';
import { fetcher } from '$lib/api';
import type { UserInfo, UserTokenResponse } from '$lib/models/UserData';
import { error, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { isAxiosError } from 'axios';

//Getting this to work took me at least 4 hours. This is a cry for help.
//Nevermind. Make that at least 6.
//still not working.
//nvm finally.
export const load = async ({ url, cookies, locals }: ServerLoadEvent) => {
	try {
		const tokenResponse = await fetcher<UserTokenResponse>(
			'/api/auth/steam/return?' + url.searchParams.toString()
		);

		cookies.set('Authorization', tokenResponse.token, {
			path: '/',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28), // 4 weeks
			secure: !dev
		});

		const user = await fetcher<UserInfo>('/api/auth/verifyToken', tokenResponse.token);
		locals.user = user;
		console.log('Logged in as user ' + user.id);

		throw redirect(307, '/');
	} catch (e) {
		if (isAxiosError(e) && e.response)
			throw error(e.response?.status, { message: e.response.data.error });
		else throw e;
	}
};
