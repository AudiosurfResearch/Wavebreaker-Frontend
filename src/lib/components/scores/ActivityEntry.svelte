<script lang="ts">
	import type { ExtendedScoreInfo } from '$lib/models/ScoreData';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let score: ExtendedScoreInfo;
	let formatter = Intl.NumberFormat('en');
</script>

<div class="flex flex-col text-base-content/60">
	<a href="/users/{score.userId}" class="text-base-content font-semibold hover:underline"
		>{score.player.username}: {formatter.format(score.score)} pts.</a
	>
	<a
		href="/songs/{score.songId}"
		class="overflow-hidden overflow-ellipsis hover:underline"
	>
		{score.song.musicbrainzArtist ?? score.song.artist} - {score.song.musicbrainzTitle ??
			score.song.title}</a
	>
</div>

<!-- "jo is gut so" - SpaceDave
<div class="grid grid-cols-3 items-center min-h-0">
	<div class="flex flex-row gap-x-2">
		<img
			class="avatar w-12 h-12 rounded-xl"
			alt="Avatar of {score.player.username}"
			src={score.player.avatarUrlMedium}
		/>
		<div class="hidden md:flex flex-col">
			<span class="font-semibold">{score.player.username}</span>
			<span>{formatter.format(score.score)}</span>
		</div>
	</div>
	<div class="flex flex-col items-center">
		<Fa icon={faArrowRight} />
		<span class="md:hidden">{formatter.format(score.score)}</span>
	</div>
	<div class="flex flex-row gap-x-2 ml-auto md:ml-0 min-h-0">
		{#if score.song.smallCoverUrl}
			<img class="avatar w-12 h-12 rounded-xl" alt="Song cover" src={score.song.smallCoverUrl} />
		{/if}
		<div class="md:flex flex-col" class:hidden={score.song.smallCoverUrl} class:flex={!score.song.smallCoverUrl}>
			<div class="font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis w-full">{score.song.musicbrainzTitle ?? score.song.title}</div>
			<div class="overflow-hidden overflow-ellipsis">{score.song.musicbrainzArtist ?? score.song.artist}</div>
		</div>
	</div>
</div>
 -->
