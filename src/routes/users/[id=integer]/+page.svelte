<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import UserDisplay from '$lib/components/users/UserDisplay.svelte';
	import UserDisplaySmall from '$lib/components/users/UserDisplaySmall.svelte';
	import { format } from 'timeago.js';
	import { characterList } from '$lib/characterUtils';
	import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
	import ScoreBox from '$lib/components/scores/ScoreBox.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { enhance } from '$app/forms';
	import type { Score } from '$lib/models/ScoreData';
	import ScoreDetailModal from '$lib/components/scores/ScoreDetailModal.svelte';
	import { env } from '$env/dynamic/public';

	export let data: PageData;
	export let form: ActionData;

	if (form?.success) data.isRivalResponse.isRival = !data.isRivalResponse.isRival;

	let formatter = Intl.NumberFormat('en');

	let modalOpen = false;
	let modalScore: Score = undefined;
	function modalFunction(scoreData: Score) {
		modalScore = scoreData;
		modalOpen = true;
	}
</script>

<svelte:head>
	<title>Wavebreaker | {data.userResult.username}</title>
	<meta
		name="description"
		content="User page of {data.userResult
			.username} on Wavebreaker, an Audiosurf 1 server reimplementation."
	/>

	<meta content="Wavebreaker" property="og:site_name" />
	<meta content={data.userResult.username} property="og:title" />
	<meta
		content="Profile of {data.userResult
			.username} on Wavebreaker, an open-source Audiosurf server reimplementation."
		property="og:description"
	/>
	<meta content={data.userResult.avatarUrl} property="og:image" />

	<meta content={env.PUBLIC_FRONTEND_URL + '/users/' + data.userResult.id} property="og:url" />
	<meta content="#009EFF" name="theme-color" />
</svelte:head>

<div class="flex p-4 gap-4 justify-center items-stretch w-full flex-col">
	<UserDisplay targetUser={data.userResult} />

	{#if data.isRivalResponse != undefined}
		{#if !data.isRivalResponse.isRival && data.user.id != data.userResult.id}
			<form method="POST" action="?/addRival" use:enhance>
				<button class="btn btn-success w-full md:w-44"><Fa icon={faUserPlus} />Add rival</button>
			</form>
		{:else}
			<form method="POST" action="?/removeRival" use:enhance>
				<button class="btn btn-error w-full md:w-44"><Fa icon={faUserMinus} />Remove rival</button>
			</form>
		{/if}
	{/if}

	<div class="stats stats-vertical rounded-3xl bg-neutral lg:stats-horizontal grow shadow">
		<div class="stat">
			<div class="stat-title">Joined</div>
			<div class="stat-value text-3xl lg:text-4xl">{format(data.userResult.joinedAt)}</div>
		</div>

		<div class="stat">
			<div class="stat-title">Total score</div>
			<div class="stat-value text-3xl lg:text-4xl">
				{formatter.format(data.userResult.totalScore)}
			</div>
		</div>

		<div class="stat">
			<div class="stat-title">Total plays</div>
			<div class="stat-value text-3xl lg:text-4xl">{data.userResult.totalPlays}</div>
		</div>

		{#if data.userResult.favoriteCharacter}
			<div class="stat">
				<div class="stat-title">Favorite character</div>
				<div class="stat-value text-3xl lg:text-4xl">
					{characterList[data.userResult.favoriteCharacter]}
				</div>
			</div>
		{/if}

		<!-- TODO: Redesign this
			{#if data.userResult.favoriteSong}
				<div class="stat">
					<div class="stat-title">Favorite song</div>
					<div class="stat-value text-3xl lg:text-4xl">
						<a class="hover:underline" href="/songs/{data.userResult.id}"
							>{data.userResult.favoriteSong.artist} - {data.userResult.favoriteSong.title}</a
						>
					</div>
				</div>
			{/if}
		-->
	</div>

	{#if data.rivalsAndChallengers}
		{#if data.rivalsAndChallengers.rivals.length > 0}
			<h2 class="text-3xl font-bold">Rivals</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-3">
				{#each data.rivalsAndChallengers.rivals as rival}
					<UserDisplaySmall targetUser={rival} />
				{/each}
			</div>
		{/if}
		{#if data.rivalsAndChallengers.challengers.length > 0}
			<h2 class="text-3xl font-bold">Challengers</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-3">
				{#each data.rivalsAndChallengers.challengers as challenger}
					<UserDisplaySmall targetUser={challenger} />
				{/each}
			</div>
		{/if}
	{/if}

	{#if data.latestScoresResult != undefined}
		<div class="mt-3">
			<h2 class="text-3xl font-bold mb-2">Latest scores</h2>
			<div class="flex flex-col gap-y-2 p-3">
				{#each data.latestScoresResult.scores as score}
					<ScoreBox
						targetEntity={score.song}
						targetScore={score}
						entityImage={score.song.coverUrl}
						entityImageSmall={score.song.smallCoverUrl}
						{modalFunction}
					/>
				{/each}
			</div>
		</div>
		<div class="mt-3">
			<h2 class="text-3xl font-bold mb-2">Best scores</h2>
			<div class="flex flex-col gap-y-2 p-3">
				{#each data.bestScoresResult.scores as score, i}
					<ScoreBox
						placement={i + 1}
						targetEntity={score.song}
						targetScore={score}
						entityImage={score.song.coverUrl}
						entityImageSmall={score.song.smallCoverUrl}
						{modalFunction}
					/>
				{/each}
			</div>
		</div>
	{:else}
		<div class="mt-3">
			<div class="text-3xl font-bold mb-2 text-center">No scores yet!</div>
		</div>
	{/if}
</div>

{#if modalScore}
	<ScoreDetailModal bind:showModal={modalOpen} targetScore={modalScore} />
{/if}
