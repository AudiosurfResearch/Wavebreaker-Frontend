// See https://svelte.dev/docs/kit/types#app.d.ts
import type { LyricEntry } from "$lib/errors";

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			randomLyric: LyricEntry;
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}
