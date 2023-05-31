<script lang="ts">
	import type { PageData } from './$types';
	import ScoreTable from '../../../components/scores/ScoreTable.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title
		>Wavebreaker | {data.songResult.musicbrainzArtist ?? data.songResult.artist} - {data.songResult
			.musicbrainzTitle ?? data.songResult.title}</title
	>
</svelte:head>

<div class="flex p-4 gap-4 justify-center items-stretch w-full flex-col">
	<div
		class="flex mx-5 gap-y-2 items-center flex-col
    md:flex-row md:space-x-5"
	>
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
</div>
