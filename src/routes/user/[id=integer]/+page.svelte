<script lang="ts">
	import type { PageData } from './$types';
	import teamBadgeIcon from '$lib/assets/wavebreaker_icon_white.svg';
	import UserBadge from '../../../components/UserBadge.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Wavebreaker | {data.userResult.username}</title>
</svelte:head>

<div
	class="flex p-4 gap-4 rounded-3xl bg-neutral w-full justify-start items-center flex-col lg:flex-row"
>
	<div class="avatar self-start">
		<div class="max-w-xs lg:max-w-sm rounded-3xl mr-4">
			<img src={data.userResult.avatarUrl} alt="Avatar of {data.userResult.username}" />
		</div>
	</div>
	<div class="flex flex-col self-start lg:self-center gap-y-2">
		<div class="flex flex-row items-center flex-wrap">
			<div class="max-w-5xl mr-3">
				<h1 class="text-3xl lg:text-5xl font-bold break-words">
                    <!-- TODO: Try to either wrap or cut off extremely long usernames somehow -->
					{data.userResult.username}
				</h1>
			</div>
			{#if data.userResult.accountType == 3}
				<UserBadge
					classExt="bg-gradient-to-r from-teal-400 to-primary my-1"
					imgSrc={teamBadgeIcon}
					label={'Wavebreaker Team'}
				/>
			{:else if data.userResult.accountType == 2}
				<UserBadge classExt="bg-error" label={'Moderator'} />
			{/if}
		</div>
		<div class="ml-1">
			<b>Total score:</b> 69696969<br />
			<b>Favorite character:</b> Ninja Mono<br />
            put some more stuff here, idk what<br />
            these are merely placeholders
		</div>
	</div>
</div>
