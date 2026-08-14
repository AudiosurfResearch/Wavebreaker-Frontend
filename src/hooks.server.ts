import type { Handle, HandleServerError } from '@sveltejs/kit';
import type { LyricEntry } from '$lib/errors';

export const handleError: HandleServerError = async ({ message, error }) => {
  console.error(error);

	const textArray: LyricEntry[] = [
		{
			lyric: "Don't let me go!",
			url: 'https://soundcloud.com/asuzora/dont-ft-ranasol',
		},
		{
			lyric: 'And I falter as an afterthought',
			url: 'https://www.youtube.com/watch?v=0iVlSNpq8i8',
		},
		{
			lyric: "It's okay, I am paper, recycled easily",
			url: 'https://jamiepaige.bandcamp.com/album/c-sides',
		},
	];

	return {
		message,
		randomLyric: textArray[Math.floor(Math.random() * textArray.length)]!,
	};
};

// see https://github.com/openapi-ts/openapi-typescript/blob/main/packages/openapi-fetch/examples/sveltekit/src/hooks.server.ts
export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			// SvelteKit doesn't serialize any headers on server-side fetches by default but openapi-fetch uses this header for empty responses.
			return name === 'content-length';
		},
	});
};
