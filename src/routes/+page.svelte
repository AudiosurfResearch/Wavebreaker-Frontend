<script lang="ts">
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import logo from '$lib/assets/wavebreaker_icon.svg';
	import SongDisplaySmall from '$lib/components/songs/SongDisplaySmall.svelte';
	import Fa from 'svelte-fa';
	import type { PageData } from './$types';
	import { faCircleInfo, faDownload, faExternalLink } from '@fortawesome/free-solid-svg-icons';
	import ActivityEntry from '$lib/components/scores/ActivityEntry.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Wavebreaker | Home</title>
	<meta
		name="description"
		content="An open-source reimplementation of Audiosurf's server. View your scores, songs and rivals!"
	/>

	<meta content="Wavebreaker" property="og:site_name" />
	<meta content="Home" property="og:title" />
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
		<div class="bg-neutral rounded-xl p-4 shadow grow">
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
			{:else}
				<p class="text-center text-base-content/60 my-5"><i>No songs available.</i></p>
			{/if}
		</div>
		{#if data.recentScores}
			<div class="bg-neutral rounded-xl p-4 shadow grow">
				<h2 class="text-xl font-bold">Recent activity</h2>
				<div class="flex flex-col p-2 gap-y-3">
					{#each data.recentScores as score}
						<ActivityEntry score={score} />
					{/each}
				</div>
			</div>
		{/if}
		{#if data.rivalScores}
			<div class="bg-neutral rounded-xl p-4 shadow grow">
				<h2 class="text-xl font-bold">Rivals' activity</h2>
				<div class="flex flex-col p-2 gap-y-3">
					{#each data.rivalScores as score}
						<ActivityEntry score={score} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div class="flex flex-col items-center lg:flex-row-reverse px-7 my-4 max-w-full">
		<img src={logo} class="py-14 max-w-xs lg:max-w-sm" alt="Wavebreaker logo" />
		<div>
			<h1 class="text-5xl font-bold">Welcome to Wavebreaker</h1>
			<p class="py-6">
				Wavebreaker is an open-source reimplementation of Audiosurf's online services that is being
				actively developed. It aims to provide the same functionality as the original server, while
				being more modern and adding a few things on top.
			</p>
			<p>
				So, what are you waiting for? <a
					href="https://github.com/AudiosurfResearch/Wavebreaker-Hook/releases/latest"
					class="btn btn-link btn-primary btn-sm normal-case"><Fa icon={faDownload} />Jump in!</a
				>
			</p>
		</div>
	</div>
{/if}
<div class="flex">
	<div class="stats stats-vertical md:stats-horizontal grow rounded-xl bg-neutral shadow">
		<div class="stat">
			<div class="stat-value text-3xl lg:text-4xl">{data.serverStats.userCount}</div>
			<div class="stat-title">players registered</div>
		</div>
		<div class="stat">
			<div class="stat-value text-3xl lg:text-4xl">{data.serverStats.songCount}</div>
			<div class="stat-title">songs registered</div>
		</div>
		<div class="stat">
			<div class="stat-value text-3xl lg:text-4xl">{data.serverStats.scoreCount}</div>
			<div class="stat-title">scores submitted</div>
		</div>
	</div>
</div>
