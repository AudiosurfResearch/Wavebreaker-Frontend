import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { dev } from '$app/environment'

export const load: PageServerLoad = async () => {
    throw redirect(302, '/')
}

export const actions: Actions = {
    default({ cookies }) {

        cookies.delete('Authorization', {
			path: '/',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 2 weeks
			secure: !dev
		});

        throw redirect(302, '/')
    },
}