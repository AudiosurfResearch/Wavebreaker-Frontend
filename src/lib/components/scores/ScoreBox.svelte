<script lang="ts">
	import type { Score } from '$lib/models/ScoreData';
	import type { Song } from '$lib/models/SongData';
	import type { UserInfo } from '$lib/models/UserData';
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
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

<!--TODO: Make image not move slightly when text overflows-->
<div
	class="bg-[position:0px] bg-no-repeat bg-cover rounded-xl"
	style="background-image: url('{entityImage}');"
>
	<div
		class="grid md:flex h-full p-3 shadow rounded-xl gap-x-3 gap-y-1 items-center {entityImage &&
			'bg-gradient-to-r from-neutral/80 to-75% to-neutral'}"
		class:bg-neutral={!entityImage}
	>
		<div class="flex flex-row items-center gap-x-3">
			{#if placement}
				<p class="text-3xl font-bold text-center w-8">{placement}</p>
			{/if}
			{#if entityImage}
				<img class="w-12 h-12 rounded-xl" src={entityImage} alt="Score entry" />
			{/if}
			<div class="max-w-md overflow-hidden">
				{#if 'title' in targetEntity}
					<a
						href={`/songs/${targetEntity.id}`}
						class="hover:underline"
						title="Song title and artist"
					>
						<p class="font-bold">{targetEntity.musicbrainzTitle ?? targetEntity.title}</p>
						<p class="text-sm">{targetEntity.musicbrainzArtist ?? targetEntity.artist}</p>
					</a>
				{:else}
					<a href={`/users/${targetEntity.id}`} class="hover:underline">
						<p class="font-bold">{targetEntity.username}</p>
					</a>
				{/if}
			</div>
		</div>
		<div class="flex flex-row items-center gap-x-2 justify-self-end mt-px ml-auto text-right">
			<div class="flex flex-col">
				<p title="Score">
					{formatter.format(targetScore.score)}
				</p>
				<p title="Time played" class="text-neutral-content text-sm">
					{format(targetScore.rideTime)}
				</p>
			</div>
			<button class="btn btn-square btn-sm btn-ghost"><Fa icon={faInfoCircle} /> </button>
		</div>
	</div>
</div>
