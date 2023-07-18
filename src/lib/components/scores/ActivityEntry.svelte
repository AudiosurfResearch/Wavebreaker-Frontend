<script lang="ts">
	import type { ExtendedScoreInfo } from '$lib/models/ScoreData';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let score: ExtendedScoreInfo;
	let formatter = Intl.NumberFormat('en');
</script>

<div class="grid grid-cols-3 items-center">
	<a href="/users/{score.userId}" class="flex flex-row gap-x-2 hover:underline">
		<img
			class="avatar w-12 h-12 rounded-xl"
			alt="Avatar of {score.player.username}"
			src={score.player.avatarUrlMedium}
		/>
		<div class="flex flex-col whitespace-nowrap overflow-hidden overflow-ellipsis justify-items-center">
			<div class="font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">{score.player.username}</div>
			<span class="hidden md:block">{formatter.format(score.score)}</span>
		</div>
	</a>
	<div class="flex flex-col items-center">
		<Fa icon={faArrowRight} />
		<span class="md:hidden">{formatter.format(score.score)}</span>
	</div>
	<a href="/songs/{score.songId}" class="flex flex-row gap-x-2 hover:underline">
		{#if score.song.smallCoverUrl}
			<img class="avatar w-12 h-12 rounded-xl" alt="Song cover" src={score.song.smallCoverUrl} />
		{/if}
		<div
			class="flex flex-col whitespace-nowrap overflow-hidden overflow-ellipsis"
		>
			<span class="font-semibold overflow-hidden overflow-ellipsis">
				{score.song.musicbrainzTitle ?? score.song.title}
			</span>
			<span class="overflow-hidden overflow-ellipsis">
				{score.song.musicbrainzArtist ?? score.song.artist}
			</span>
		</div>
	</a>
</div>
