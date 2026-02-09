import type { HandleServerError } from "@sveltejs/kit";
import { dev } from "$app/environment";
import type { LyricEntry } from "$lib/errors";

if (dev) {
	const { server } = await import("./mocks/node");

	server.listen();
}

export const handleError: HandleServerError = async ({ message }) => {
	const textArray: LyricEntry[] = [
		{
			lyric: "Don't let me go!",
			url: "https://soundcloud.com/asuzora/dont-ft-ranasol",
		},
		{
			lyric: "And I falter as an afterthought",
			url: "https://www.youtube.com/watch?v=0iVlSNpq8i8",
		},
		{
			lyric: "It's okay, I am paper, recycled easily",
			url: "https://jamiepaige.bandcamp.com/album/c-sides",
		},
	];

	return {
		message,
		// biome-ignore lint/style/noNonNullAssertion: access will always stay in array bounds
		randomLyric: textArray[Math.floor(Math.random() * textArray.length)]!,
	};
};
