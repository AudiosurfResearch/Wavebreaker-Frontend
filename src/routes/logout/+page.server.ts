import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function load({ cookies }) {
	if (cookies.get('Authorization'))
		cookies.delete('Authorization', {
			path: '/',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 2 weeks
			secure: !dev
		});

	throw redirect(302, '/');
}
