<script lang="ts">
	import Shout from './Shout.svelte';

	import { fetcher } from '$lib/api';
	import type { GetSongShoutsResponse } from '$lib/models/ShoutData';
	import { useAccio } from '$lib/utils/accio';
	import queryString from 'query-string';

	export let songId: number;

	const {
		data: shoutResponse,
		error: shoutsError,
		refresh: refreshShouts
	} = useAccio<GetSongShoutsResponse>(
		queryString.stringifyUrl({
			url: '/api/shouts/getSongShouts',
			query: queryString.parse('&songId=' + songId + '&pageSize=10')
		}),
		{ fetcher: fetcher }
	);
</script>

{#if $shoutResponse === undefined && !$shoutsError}
	<div class="loading loading-spinner loading-lg self-center" />
{/if}
{#if $shoutsError}
	<p class="text-error">{$shoutsError.message}</p>
{/if}
{#if $shoutResponse === null}
	<i class="text-center">No shouts found.</i>
{/if}
{#if $shoutResponse && !$shoutsError}
	<div class="flex flex-col gap-y-3">
		{#each $shoutResponse.shouts as shout}
			<Shout {shout} />
		{/each}
	</div>
{/if}
