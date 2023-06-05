<script lang="ts">
	import type { PageData } from './$types';
	import { pageQueryStore } from '$lib/stores/query-store';
	import { page } from '$app/stores';
	import queryString from 'query-string';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';

	import ClassicPagination from '$lib/components/common/pagination/classic-pagination.svelte';
	import ScoreTable from '$lib/components/scores/ScoreTable.svelte';
	import type { GetScoresResponse } from '$lib/models/ScoreData';

	import { requestCancel, updateCancelToken } from '$lib/utils/accio/canceler';
	import { useAccio } from '$lib/utils/accio';
	import { fetcher } from '$lib/api';
	import ScoreBox from '$lib/components/scores/ScoreBox.svelte';

	export let data: PageData;

	const {
		data: leaderboards,
		error: leaderboardsError,
		refresh: refreshLeaderboards
	} = useAccio<GetScoresResponse>(
		queryString.stringifyUrl({
			url: '/api/scores/getScores',
			query: queryString.parse($page.url.searchParams.toString())
		}),
		{ fetcher: fetcher }
	);

	type leaderboardsQuery = {
		page: number;
		leagueId: 0 | 1 | 2;
	};

	$: pageQuery = pageQueryStore<leaderboardsQuery>({
		page: 1,
		leagueId: 2
	});

	function changePage(newPage: number) {
		$requestCancel.cancel('Filter Changed');
		updateCancelToken();
		pageQuery.updateSingle('page', newPage);
	}

	function changeLeagueId(newLeagueId: number) {
		$requestCancel.cancel('Filter Changed');
		updateCancelToken();
		pageQuery.updateSingle('leagueId', newLeagueId);
	}

	const pageUnsubscribe = page.subscribe((p) => {
		if (browser) {
			refreshLeaderboards({
				newUrl: queryString.stringifyUrl({
					url: '/api/scores/getScores',
					query: queryString.parse(
						p.url.searchParams.toString() +
							'&includePlayer=true&pageSize=14&scoreSort=desc&songId=' +
							data.songResult.id
					)
				})
			});
		}
	});

	onDestroy(pageUnsubscribe);
</script>

<svelte:head>
	<title
		>Wavebreaker | {data.songResult.musicbrainzArtist ?? data.songResult.artist} - {data.songResult
			.musicbrainzTitle ?? data.songResult.title}</title
	>
</svelte:head>

<div class="flex p-4 gap-4 justify-center items-stretch w-full flex-col">
	<div class="flex mx-5 gap-y-2 items-center flex-col md:flex-row md:space-x-5">
		{#if data.songResult.coverUrl}
			<div class="avatar">
				<div class="max-w-xs rounded-3xl shadow">
					<img
						src={data.songResult.coverUrl}
						alt="Cover of {data.songResult.musicbrainzArtist ?? data.songResult.artist} - {data
							.songResult.musicbrainzTitle ?? data.songResult.title}"
					/>
				</div>
			</div>
		{/if}

		<div class="flex flex-col items-center md:items-start space-y-1 break-words">
			<h1 class="text-3xl md:text-5xl font-bold">
				{data.songResult.musicbrainzTitle ?? data.songResult.title}
			</h1>
			<h2 class="text-xl md:text-2xl font-bold">
				{data.songResult.musicbrainzArtist ?? data.songResult.artist}
			</h2>
			{#if data.songResult.mbid}
				<i class="text-base-content/60">
					{data.songResult.artist} - {data.songResult.title}
				</i>
			{/if}
		</div>
	</div>
	<div class="tabs tabs-boxed self-center shadow">
		<button
			on:click={() => changeLeagueId(0)}
			class="tab {$pageQuery.leagueId == 0 && 'bg-success text-success-content'}"
		>
			Casual
		</button>
		<button
			on:click={() => changeLeagueId(1)}
			class="tab {$pageQuery.leagueId == 1 && 'bg-warning text-warning-content'}"
		>
			Pro
		</button>
		<button
			on:click={() => changeLeagueId(2)}
			class="tab {$pageQuery.leagueId == 2 && 'bg-primary text-primary-content'}"
		>
			Elite
		</button>
	</div>
	{#if !$leaderboards && !$leaderboardsError}
		<p>Loading...</p>
	{/if}
	{#if $leaderboardsError}
		<p class="text-error">{$leaderboardsError.message}</p>
	{/if}
	{#if $leaderboards}
		{#each $leaderboards.scores as score, i}
			<ScoreBox
				placement={(i + 1) * $pageQuery.page}
				targetEntity={score.player}
				targetScore={score}
			/>
		{/each}
		<div class="self-center shadow">
			<ClassicPagination
				totalItems={$leaderboards.totalCount}
				pageSize={14}
				currentPage={$pageQuery.page}
				{changePage}
			/>
		</div>
	{/if}
</div>
