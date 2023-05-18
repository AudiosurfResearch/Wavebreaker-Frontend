import { writable } from 'svelte/store';

import type { UserInfo } from '$lib/models/UserData';

export const userInfo = writable(getUser());

function getUser(): UserInfo | undefined {
   return undefined;
}