<script>
	import { env } from '$env/dynamic/public';
	import logo from '$lib/assets/wavebreaker_icon.svg';
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
