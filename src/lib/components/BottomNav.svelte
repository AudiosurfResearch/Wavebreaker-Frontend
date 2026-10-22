<script lang="ts">
	import HomeIcon from '@lucide/svelte/icons/home';
	import MusicIcon from '@lucide/svelte/icons/music';
	import TrophyIcon from '@lucide/svelte/icons/trophy';
	import UserIcon from '@lucide/svelte/icons/user';

	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let isRoot = $derived(page.url.pathname === '/');
	let isUserPage = $derived(page.url.pathname.startsWith('/users'));
	let isSongPage = $derived(page.url.pathname.startsWith('/songs'));
	let isRankingPage = $derived(page.url.pathname.startsWith('/rankings'));
</script>

<div
	class="fixed right-0 bottom-0 left-0 z-50 flex h-16 w-full flex-row items-center justify-around border-t bg-background md:hidden"
>
	<a
		href={resolve('/')}
		class={[
			isRoot && 'bg-accent text-primary',
			'flex h-full w-full flex-col items-center justify-center space-y-1'
		]}
	>
		<HomeIcon />
		<div class="text-xs">Home</div>
	</a>
	<a
		href={resolve('users/search')}
		class={[
			isUserPage && 'bg-accent text-primary',
			'flex h-full w-full flex-col items-center justify-center space-y-1'
		]}
	>
		<UserIcon />
		<div class="text-xs">Users</div>
	</a>
	<a
		href={resolve('songs/search')}
		class={[
			isSongPage && 'bg-accent text-primary',
			'flex h-full w-full flex-col items-center justify-center space-y-1'
		]}
	>
		<MusicIcon />
		<div class="text-xs">Songs</div>
	</a>
	<a
		href={resolve('rankings/users')}
		class={[
			isRankingPage && 'bg-accent text-primary',
			'flex h-full w-full flex-col items-center justify-center space-y-1'
		]}
	>
		<TrophyIcon />
		<div class="text-xs">Rankings</div>
	</a>
</div>
