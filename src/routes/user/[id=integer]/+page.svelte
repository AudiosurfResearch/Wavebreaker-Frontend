<script lang="ts">
	import type { PageData } from './$types';
	import teamBadgeIcon from '$lib/assets/wavebreaker_icon_white.svg';
	import UserBadge from '../../../components/UserBadge.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Wavebreaker | {data.userResult.username}</title>
</svelte:head>

<div class="flex p-4 gap-4 justify-center items-stretch w-full flex-col lg:flex-row">
	<div
		class="flex p-5 rounded-3xl gap-y-2 lg:gap-y-3 bg-neutral justify-center items-center flex-col"
	>
		<div class="avatar">
			<div class="max-w-xs lg:max-w-sm rounded-3xl">
				<img src={data.userResult.avatarUrl} alt="Avatar of {data.userResult.username}" />
			</div>
		</div>
		<div>
			<h1
				class="flex max-w-sm lg:max-w-md text-2xl lg:text-3xl font-bold whitespace-nowrap overflow-hidden text-ellipsis"
			>
				{data.userResult.username}
			</h1>
		</div>
		{#if data.userResult.accountType == 3}
			<UserBadge
				classExt="bg-gradient-to-r from-teal-400 to-primary"
				imgSrc={teamBadgeIcon}
				label={'Wavebreaker Team'}
			/>
		{:else if data.userResult.accountType == 2}
			<UserBadge classExt="bg-error" label={'Moderator'} />
		{/if}
	</div>
	<div class="flex p-5 rounded-3xl bg-neutral grow">
		<div class="self-center">
			<b>Total score:</b> {data.userResult.totalScore}
		</div>
	</div>
</div>
