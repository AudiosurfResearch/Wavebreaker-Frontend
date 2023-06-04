<script lang="ts">
	import type { UserInfo } from '$lib/models/UserData';

	import { pageQueryStore } from '$lib/stores/query-store';
	import { page } from '$app/stores';
	import queryString from 'query-string';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';

	import { requestCancel, updateCancelToken } from '$lib/utils/accio/canceler';
	import { useAccio } from '$lib/utils/accio';
	import { fetcher } from '$lib/api';
	import UserDisplaySmall from '$lib/components/users/UserDisplaySmall.svelte';

	type userSearchQuery = {
		query: string;
	};

	type userSearchQueryResponse = {
		results: UserInfo[];
	};

	$: pageQuery = pageQueryStore<userSearchQuery>({
		query: null
	});

	const {
		data: searchResponse,
		error: searchError,
		refresh: refreshResults
	} = useAccio<userSearchQueryResponse>(
		queryString.stringifyUrl({
			url: '/api/users/searchUsers',
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
					url: '/api/users/searchUsers',
					query: queryString.parse(p.url.searchParams.toString())
				})
			});
		}
	});

	onDestroy(pageUnsubscribe);
</script>

<svelte:head>
	<title>Wavebreaker | User search</title>
</svelte:head>

<input
	on:input={(e) => searchUpdated(e.currentTarget.value)}
	type="text"
	placeholder="Search users..."
	class="input w-full self-center bg-neutral shadow"
/>

{#if !$searchResponse && !$searchError}
	<p>Loading...</p>
{/if}
{#if $searchError && $searchError.status != 400}
	<p class="text-error">{$searchError.message}</p>
{/if}
{#if $searchResponse}
	<div class="flex flex-col gap-y-3 my-5 mx-3">
		{#each $searchResponse.results as user}
			<UserDisplaySmall targetUser={user} />
		{/each}
	</div>
{/if}
