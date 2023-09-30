<script lang="ts">
	import ClassicPagination from '$lib/components/common/pagination/classic-pagination.svelte';
	import type { GetScoresResponse, Score } from '$lib/models/ScoreData';
	import { pageQueryStore } from '$lib/stores/query-store';
	import { useAccio } from '$lib/utils/accio';
	import queryString from 'query-string';
	import type { PageData } from '../$types';
	import { page } from '$app/stores';
	import { fetcher } from '$lib/utils/api';
	import { requestCancel, updateCancelToken } from '$lib/utils/accio/canceler';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import ScoreBox from '$lib/components/scores/ScoreBox.svelte';
	import ScoreDetailModal from '$lib/components/scores/ScoreDetailModal.svelte';

	export let data: PageData;

	type scoresQuery = {
		page: number;
	};

	$: pageQuery = pageQueryStore<scoresQuery>({
		page: 1
	});

	const {
		data: scores,
		error: scoresError,
		refresh: refreshScores
	} = useAccio<GetScoresResponse>(
		queryString.stringifyUrl({
			url: '/api/scores/getScores',
			query: queryString.parse(
				$page.url.searchParams.toString() + '&pageSize=14&userId=' + data.userResult.id
			)
		}),
		{ fetcher: fetcher }
	);

	function changePage(newPage: number) {
		$requestCancel.cancel('Filter Changed');
		updateCancelToken();
		pageQuery.updateSingle('page', newPage);
	}

	const pageUnsubscribe = page.subscribe((p) => {
		if (browser) {
			refreshScores({
				newUrl: queryString.stringifyUrl({
					url: '/api/scores/getScores',
					query: queryString.parse(
						p.url.searchParams.toString() + '&pageSize=14&userId=' + data.userResult.id
					)
				})
			});
		}
	});

	onDestroy(pageUnsubscribe);

	let modalOpen = false;
	let modalScore: Score = undefined;
	function modalFunction(scoreData: Score) {
		modalScore = scoreData;
		modalOpen = true;
	}
</script>

<div class="text-sm breadcrumbs">
	<ul>
		<li>
			<a class="link-primary" href="/users/{data.userResult.id}">{data.userResult.username}</a>
		</li>
		<li>All scores</li>
	</ul>
</div>

<h1 class="text-4xl">All scores of <b class="font-semibold">{data.userResult.username}</b></h1>

<div class="flex flex-col mt-4 gap-2">
	{#if !$scores && !$scoresError}
		<div class="loading loading-spinner loading-lg self-center" />
	{/if}
	{#if $scoresError}
		<p class="text-error">{$scoresError.message}</p>
	{/if}
	{#if $scores}
		<div class="self-center shadow">
			<ClassicPagination
				totalItems={$scores.totalCount}
				pageSize={14}
				currentPage={$pageQuery.page}
				{changePage}
			/>
		</div>
		<div class="flex flex-col gap-y-2">
			{#each $scores.scores as score, i}
				{#key $scores.scores}
					<ScoreBox targetEntity={score.song} targetScore={score} {modalFunction} />
				{/key}
			{/each}
		</div>
	{/if}
</div>

{#if modalScore}
	<ScoreDetailModal bind:showModal={modalOpen} targetScore={modalScore} />
{/if}
