<script>
	import logo from '$lib/assets/wavebreaker_icon.svg';
</script>

<svelte:head>
    <title>Wavebreaker | Home</title> 
</svelte:head>

<div class="hero">
	<div class="hero-content flex-col lg:flex-row-reverse p-9">
		<img src={logo} class="py-14 max-w-xs lg:max-w-sm" alt="Wavebreaker logo" />
		<div class="max-w-5xl">
			<h1 class="text-5xl font-bold">Welcome to Wavebreaker</h1>
			<p class="py-6">
				Wavebreaker is a WIP open-source reimplementation of Audiosurf's online services. It aims to
				provide the same functionality as the original game.
			</p>
		</div>
	</div>
</div>
