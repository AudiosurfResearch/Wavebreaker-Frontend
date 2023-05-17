// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { UserInfo } from '$lib/api';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserInfo; // Your type here
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
