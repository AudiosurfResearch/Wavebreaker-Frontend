<script lang="ts">
	import { pageQueryStore } from '$lib/stores/query-store';
	import { page } from '$app/stores';
	import queryString from 'query-string';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';

	import { requestCancel, updateCancelToken } from '$lib/utils/accio/canceler';
	import { useAccio } from '$lib/utils/accio';
	import { fetcher } from '$lib/api';
	import type { Song } from '$lib/models/SongData';
	import SongDisplaySmall from '$lib/components/songs/SongDisplaySmall.svelte';

	type songSearchQuery = {
		query: string;
	};

	type songSearchQueryResponse = {
		results: Song[];
	};

	$: pageQuery = pageQueryStore<songSearchQuery>({
		query: null
	});

	const {
		data: searchResponse,
		error: searchError,
		refresh: refreshResults
	} = useAccio<songSearchQueryResponse>(
		queryString.stringifyUrl({
			url: '/api/songs/searchSongs',
			query: queryString.parse($page.url.searchParams.toString())
		}),
		{ fetcher: fetcher }
	);

	let debounceTimer;
	function searchUpdated(query: string) {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			$requestCancel.cancel('Search query changed');
			updateCancelToken();
			query = query.trim();
			if (query) {
				if (query.length >= 1) {
					pageQuery.update({
						query
					});
				} else {
					pageQuery.updateSingle('query', null);
				}
			} else {
				pageQuery.updateSingle('query', null);
			}
		}, 500);
	}

	const pageUnsubscribe = page.subscribe((p) => {
		if (browser) {
			refreshResults({
				newUrl: queryString.stringifyUrl({
					url: '/api/songs/searchSongs',
					query: queryString.parse(p.url.searchParams.toString())
				})
			});
		}
	});

	onDestroy(pageUnsubscribe);
</script>

<svelte:head>
	<title>Wavebreaker | Song search</title>
	<meta
		name="description"
		content="Song search page for Wavebreaker. Search for songs and see their leaderboards."
	/>
</svelte:head>

<div class="flex flex-col">
	<input
		on:input={(e) => searchUpdated(e.currentTarget.value)}
		type="text"
		placeholder="Search songs..."
		class="input w-full self-center bg-neutral shadow"
	/>

	{#if !$searchResponse && !$searchError}
		<div class="loading loading-spinner loading-lg self-center my-5" />
	{/if}
	{#if $searchError && $searchError.status != 400}
		<p class="text-error">{$searchError.message}</p>
	{/if}
	{#if $searchResponse}
		<div class="flex flex-col gap-y-3 my-5 mx-3">
			{#each $searchResponse.results as song}
				<SongDisplaySmall targetSong={song} />
			{/each}
		</div>
	{/if}
</div>
