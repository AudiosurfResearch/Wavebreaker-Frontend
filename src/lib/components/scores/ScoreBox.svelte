<script lang="ts">
	import type { Score } from '$lib/models/ScoreData';
	import type { Song } from '$lib/models/SongData';
	import type { UserInfo } from '$lib/models/UserData';
	import { format } from 'timeago.js';

	export let placement: number = undefined;
	export let targetEntity: UserInfo | Song;
	export let targetScore: Score;
	let entityImage: string;

	let formatter = Intl.NumberFormat('en');

	if ('avatarUrl' in targetEntity) {
		entityImage = targetEntity.avatarUrl;
	} else if ('coverUrl' in targetEntity) {
		entityImage = targetEntity.coverUrl;
	} else {
		entityImage = '';
	}
</script>

<div
	class="bg-[position:0px] bg-no-repeat bg-cover rounded-xl"
	style="background-image: url('{entityImage}');"
>
	<div
		class="flex flex-row h-full p-3 shadow rounded-xl gap-x-3 items-center {entityImage &&
			'bg-gradient-to-r from-neutral/70 to-75% to-neutral'}"
		class:bg-neutral={!entityImage}
	>
		{#if placement}
			<p class="text-3xl font-bold text-center w-10">{placement}</p>
		{/if}
		{#if entityImage}
			<img class="w-12 h-12 rounded-xl" src={entityImage} alt="Score entry" />
		{/if}
		<div class="inline-block max-w-md overflow-hidden text-ellipsis">
			{#if 'title' in targetEntity}
				<a href={`/songs/${targetEntity.id}`} class="hover:underline" title="Song title and artist">
					<p class="font-bold">{targetEntity.musicbrainzTitle ?? targetEntity.title}</p>
					<p class="text-sm">{targetEntity.musicbrainzArtist ?? targetEntity.artist}</p>
				</a>
			{:else}
				<a href={`/users/${targetEntity.id}`} class="hover:underline">
					<p class="font-bold">{targetEntity.username}</p>
				</a>
			{/if}
		</div>
		<div class="justify-self-end mt-px ml-auto text-right">
			<p title="Score">
				{formatter.format(targetScore.score)}
			</p>
			<p title="Time played" class="text-neutral-content text-sm">
				{format(targetScore.rideTime)}
			</p>
		</div>
	</div>
</div>
