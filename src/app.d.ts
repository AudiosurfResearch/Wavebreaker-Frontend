// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { UserInfo } from '$lib/models/UserData.ts';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserInfo | null; // Your type here
		}
		interface PageData {
			user: UserInfo | null;
		}
		// interface Platform {}
	}
}

export {};
