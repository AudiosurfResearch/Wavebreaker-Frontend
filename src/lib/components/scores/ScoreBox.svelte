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
	export let entityImage: string = undefined;
	export let entityImageSmall: string = undefined;
	export let modalFunction: (scoreData: Score) => void = undefined;

	if (!entityImage) {
		if ('avatarUrl' in targetEntity) {
			entityImage = targetEntity.avatarUrl;
		} else if ('coverUrl' in targetEntity) {
			entityImage = targetEntity.coverUrl;
		}
	}

	if (!entityImageSmall) {
		if ('avatarUrl' in targetEntity) {
			entityImageSmall = targetEntity.avatarUrlMedium;
		} else if ('coverUrl' in targetEntity) {
			entityImageSmall = targetEntity.smallCoverUrl;
		}
	}

	let formatter = Intl.NumberFormat('en');
	let trackShapeNumbers = targetScore.trackShape.split('x').map(function (item) {
		return Math.abs(parseInt(item) - 103);
	});
	const trackShapeData = {
		labels: new Array(trackShapeNumbers.length - 1).fill(''),
		datasets: [
			{
				label: 'Height',
				data: trackShapeNumbers,
				borderColor: '#009EFF'
			}
		]
	};
</script>

<div
	class="bg-[position:0px] bg-no-repeat bg-cover rounded-xl"
	style={entityImage && 'background-image: url(' + entityImage + ');'}
>
	<!--TODO: Find a better solution to fix the weird corner bleeding-->
	<div
		class="flex flex-col md:flex-row h-full p-3 shadow rounded-xl gap-x-3 gap-y-2 items-center {entityImage &&
			'bg-gradient-to-r from-neutral/80 to-75% to-neutral'}"
		class:bg-neutral={!entityImage}
		style="width: calc(100% + 1px);"
	>
		<div class="flex md:hidden self-start w-full">
			{#if placement}
				#{placement} —
			{/if}
			{formatter.format(targetScore.score)}
			<div class="ml-auto text-base-content/60">{format(targetScore.rideTime)}</div>
		</div>
		<div class="flex flex-row items-center gap-x-3 w-full md:max-w-xl">
			{#if placement}
				<p class="hidden md:block text-3xl font-bold text-center w-8 min-w-[2rem]">{placement}</p>
			{/if}
			{#if entityImageSmall}
				<img class="w-12 h-12 rounded-xl" src={entityImageSmall} alt="Score entry" />
			{/if}
			{#if 'title' in targetEntity}
				<a
					href={`/songs/${targetEntity.id}`}
					class="hover:underline overflow-hidden"
					title="Song title and artist"
				>
					<div class="font-semibold">
						{targetEntity.musicbrainzTitle ?? targetEntity.title}
					</div>
					<p class="text-sm">{targetEntity.musicbrainzArtist ?? targetEntity.artist}</p>
				</a>
			{:else}
				<a href={`/users/${targetEntity.id}`} class="hover:underline overflow-hidden font-semibold">
					{targetEntity.username}
				</a>
			{/if}
			{#if 'tags' in targetEntity && targetEntity.tags}
				<div class="hidden md:flex flex-row flex-wrap gap-2">
					{#each targetEntity.tags as tag}
						<div class="badge badge-ghost">{tag}</div>
					{/each}
				</div>
			{/if}
			{#if modalFunction}
				<div class="block md:hidden ml-auto">
					<button
						aria-label="More score info"
						class="btn btn-square btn-sm btn-ghost"
						on:click={() => modalFunction(targetScore)}
						><Fa icon={faInfoCircle} />
					</button>
				</div>
			{/if}
		</div>
		<div class="hidden md:flex flex-row items-center justify-self-end gap-x-2 ml-auto text-right">
			<div class="flex flex-col">
				<p title="Score">
					{formatter.format(targetScore.score)}
				</p>
				<p title="Time played" class="text-base-content/60 text-sm w-max">
					{format(targetScore.rideTime)}
				</p>
			</div>
			{#if modalFunction}
				<button
					aria-label="More score info"
					class="btn btn-square btn-sm btn-ghost"
					on:click={() => modalFunction(targetScore)}
					><Fa icon={faInfoCircle} />
				</button>
			{/if}
		</div>
		{#if 'tags' in targetEntity && targetEntity.tags}
			<div class="md:hidden flex flex-row flex-wrap gap-2 self-start">
				{#each targetEntity.tags as tag}
					<div class="badge badge-ghost">{tag}</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
