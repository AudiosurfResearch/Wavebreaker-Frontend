<script>
	import logo from '$lib/assets/wavebreaker_icon.svg';
</script>

<svelte:head>
	<title>Wavebreaker | Home</title>
	<meta
		name="description"
		content="Home page of Wavebreaker, an open-source Audiosurf 1 server reimplementation."
	/>
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
