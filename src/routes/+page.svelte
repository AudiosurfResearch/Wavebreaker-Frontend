<script lang="ts">
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import logo from '$lib/assets/wavebreaker_icon.svg';
	import SongDisplaySmall from '$lib/components/songs/SongDisplaySmall.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import type { PageData } from './$types';
	import { faCircleInfo, faExternalLink } from '@fortawesome/free-solid-svg-icons';

	export let data: PageData;
</script>

<svelte:head>
	<title>Wavebreaker | Home</title>
	<meta
		name="description"
		content="Home page of Wavebreaker, an open-source Audiosurf 1 server reimplementation."
	/>
	<meta content="Wavebreaker" property="og:title" />
	<meta
		content="An open-source reimplementation of Audiosurf's server. View your scores, songs and rivals!"
		property="og:description"
	/>
	<meta content={env.PUBLIC_FRONTEND_URL} property="og:url" />
	<meta content="#009EFF" name="theme-color" />
</svelte:head>

{#if $page.data.user != undefined}
	<h1 class="text-2xl lg:text-5xl">Welcome back, <b>{$page.data.user?.username}</b>.</h1>
	<div class="flex flex-row flex-wrap my-4 gap-3">
		<div class="bg-neutral rounded-xl p-4 shadow">
			<div class="flex flex-row items-center gap-x-2">
				<h2 class="text-xl font-bold">Wavebreaker Radio songs</h2>
				<div
					class="tooltip tooltip-warning before:w-[8rem] before:content-[attr(data-tip)]"
					data-tip="We do NOT own the rights to these songs!
							  If you like them, buy them."
				>
					<Fa icon={faCircleInfo} />
				</div>
			</div>
			{#if data.radioSongs}
				{#each data.radioSongs.songs as song}
					<div class="flex flex-row items-center self-center p-2">
						<SongDisplaySmall targetSong={song} />
						<a
							aria-label="Purchase song"
							class="btn btn-ghost btn-sm btn-square ml-auto"
							href={song.externalUrl}
							><Fa icon={faExternalLink} />
						</a>
					</div>
				{/each}
			{/if}
		</div>
	</div>
{:else}
	<div class="flex flex-col items-center lg:flex-row-reverse px-7 max-w-full">
		<img src={logo} class="py-14 max-w-xs lg:max-w-sm" alt="Wavebreaker logo" />
		<div>
			<h1 class="text-5xl font-bold">Welcome to Wavebreaker</h1>
			<p class="py-6">
				Wavebreaker is a WIP open-source reimplementation of Audiosurf's online services. It aims to
				provide the same functionality as the original server, while being more modern and adding a
				few things on top.
			</p>
		</div>
	</div>
{/if}
