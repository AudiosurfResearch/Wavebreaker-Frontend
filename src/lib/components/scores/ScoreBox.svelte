<script lang="ts">
	import { characterList } from '$lib/characterUtils';
	import type { Score } from '$lib/models/ScoreData';
	import type { Song } from '$lib/models/SongData';
	import type { UserInfo } from '$lib/models/UserData';
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { format } from 'timeago.js';
	import Modal from '../common/Modal.svelte';

	export let placement: number = undefined;
	export let targetEntity: UserInfo | Song;
	export let targetScore: Score;
	export let entityImage: string = undefined;

	if (!entityImage) {
		if ('avatarUrl' in targetEntity) {
			entityImage = targetEntity.avatarUrl;
		} else if ('coverUrl' in targetEntity) {
			entityImage = targetEntity.coverUrl;
		}
	}

	let formatter = Intl.NumberFormat('en');

	let modalOpen = false;
</script>

<div
	class="bg-[position:0px] bg-no-repeat bg-cover rounded-xl"
	style={entityImage && 'background-image: url(' + entityImage + ');'}
>
	<!--TODO: Find a better solution to fix the weird corner bleeding-->
	<div
		class="grid md:flex h-full p-3 shadow rounded-xl gap-x-3 gap-y-2 items-center {entityImage &&
			'bg-gradient-to-r from-neutral/80 to-75% to-neutral'}"
		class:bg-neutral={!entityImage}
		style="width: calc(100% + 1px);"
	>
		<div class="flex md:hidden flex-row items-center">
			{#if placement}
				<b>#{placement}</b>
				<pre> — </pre>
			{/if}
			<span>{formatter.format(targetScore.score)}</span>
		</div>
		<div class="flex flex-row items-center gap-x-3 w-full md:max-w-xl">
			{#if placement}
				<p class="hidden md:block text-3xl font-bold text-center w-8 min-w-[2rem]">{placement}</p>
			{/if}
			{#if entityImage}
				<img class="w-12 h-12 rounded-xl" src={entityImage} alt="Score entry" />
			{/if}
			<div class="overflow-hidden">
				{#if 'title' in targetEntity}
					<a
						href={`/songs/${targetEntity.id}`}
						class="hover:underline"
						title="Song title and artist"
					>
						<div class="flex items-center gap-x-2">
							<b>{targetEntity.musicbrainzTitle ?? targetEntity.title}</b>
							{#if 'tags' in targetEntity && targetEntity.tags}
								<div class="hidden md:flex flex-row flex-wrap gap-1">
									{#each targetEntity.tags as tag}
										<div class="badge badge-ghost">{tag}</div>
									{/each}
								</div>
							{/if}
						</div>
						<p class="text-sm">{targetEntity.musicbrainzArtist ?? targetEntity.artist}</p>
					</a>
				{:else}
					<a href={`/users/${targetEntity.id}`} class="hover:underline">
						<p class="font-bold">{targetEntity.username}</p>
					</a>
				{/if}
			</div>

			<div class="block md:hidden ml-auto">
				<button class="btn btn-square btn-sm btn-ghost" on:click={() => (modalOpen = true)}
					><Fa icon={faInfoCircle} />
				</button>
			</div>
		</div>
		<div class="hidden md:flex flex-row items-center justify-self-end gap-x-2 ml-auto text-right">
			<div class="flex flex-col">
				<p title="Score">
					{formatter.format(targetScore.score)}
				</p>
				<p title="Time played" class="text-neutral-content text-sm w-max">
					{format(targetScore.rideTime)}
				</p>
			</div>

			<button class="btn btn-square btn-sm btn-ghost" on:click={() => (modalOpen = true)}
				><Fa icon={faInfoCircle} />
			</button>
		</div>
		{#if 'tags' in targetEntity && targetEntity.tags}
			<div class="md:hidden flex flex-row flex-wrap gap-2">
				{#each targetEntity.tags as tag}
					<div class="badge badge-ghost">{tag}</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<Modal bind:showModal={modalOpen}>
	<h2 class="font-bold text-xl">Score details</h2>
	<p>
		<b>Character: </b>
		{characterList[targetScore.vehicleId]}<br />
		<b>Feats:</b>
		{targetScore.feats}<br />
		<b>Density: </b>
		{targetScore.density}<br />
		<b>Gold threshold: </b>
		{formatter.format(targetScore.goldThreshold)}<br />
		<b>Total times played:</b>
		{targetScore.playCount}<br />
	</p>
</Modal>
