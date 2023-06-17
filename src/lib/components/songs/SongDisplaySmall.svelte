<script lang="ts">
	import type { Song } from '$lib/models/SongData';

	export let targetSong: Song;
</script>

<a
	href="/songs/{targetSong.id}"
	class="flex gap-y-2 gap-x-2 items-center flex-row bg-neutral rounded-xl shadow p-2"
>
	{#if targetSong.smallCoverUrl}
		<img
			src={targetSong.smallCoverUrl}
			alt="Cover of {targetSong.musicbrainzArtist ??
				targetSong.artist} - {targetSong.musicbrainzTitle ?? targetSong.title}"
			class="w-12 h-12 rounded-xl"
		/>
	{/if}
	<div class="flex flex-row items-center gap-x-2">
		<div>
			<b>{targetSong.musicbrainzTitle ?? targetSong.title}</b>
			<p class="text-sm">{targetSong.musicbrainzArtist ?? targetSong.artist}</p>
		</div>
		{#if targetSong.tags}
			<div class="flex flex-row flex-wrap gap-1">
				{#each targetSong.tags as tag}
					<div class="badge badge-ghost">{tag}</div>
				{/each}
			</div>
		{/if}
	</div>
</a>
