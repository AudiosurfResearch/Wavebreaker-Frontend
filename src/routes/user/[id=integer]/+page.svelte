<script lang="ts">
	import type { PageData } from './$types';
	import teamBadgeIcon from '$lib/assets/wavebreaker_icon_white.svg';
	import UserBadge from '../../../components/UserBadge.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Wavebreaker | {data.userResult.username}</title>
</svelte:head>

<div class="hero">
	<div class="hero-content rounded-3xl bg-neutral flex-col lg:flex-row">
		<div class="avatar">
			<div class="max-w-xs lg:max-w-sm rounded-3xl mr-4">
				<img src={data.userResult.avatarUrl} alt="Avatar of {data.userResult.username}" />
			</div>
		</div>
		<div class="max-w-5xl">
			<h1 class="flex items-center text-5xl font-bold">
				{data.userResult.username}
			</h1>
		</div>
		{#if data.userResult.accountType == 3}
			<UserBadge classExt="bg-gradient-to-r from-teal-400 to-primary" imgSrc={teamBadgeIcon} label={"Wavebreaker Team"}/>
		{:else if data.userResult.accountType == 2}
			<UserBadge classExt="bg-error" label={"Moderator"}/>
		{/if}
	</div>
</div>
