import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function loadMetadata(fetch: Function, url: string) {
	if (!browser) {
		if (url.startsWith('/api')) {
			url = `${env.PUBLIC_API_URL}${url}`;
		}
		const res = await fetch(url);
		if (res.url.includes('cloudflareaccess')) {
			return {};
		}
		if (res.ok) {
			return await res.json();
		}

		return;
	} else {
		return;
	}
}
