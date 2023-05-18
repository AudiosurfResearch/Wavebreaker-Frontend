import { fetcher } from '$lib/api';
import type { UserInfo, UserTokenResponse } from '$lib/models/UserData';
import { userInfo } from '$lib/stores';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

//Getting this to work took me at least 4 hours. This is a cry for help.
//Nevermind. Make that at least 6.
//still not working.
export const load = async ({ url, cookies }: ServerLoadEvent) => {
	const tokenResponse = await fetcher<UserTokenResponse>(
		'/api/auth/steam/return?' + url.searchParams.toString()
	);

	cookies.set('Authorization', tokenResponse.token, {
		path: '/',
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 2 weeks
		secure: false,
	});

	const user = await fetcher<UserInfo>('/api/auth/verifyToken', tokenResponse.token);
	userInfo.set(user);
	console.log("Logged in as user " + user.id)

	throw redirect(307, '/');
};
