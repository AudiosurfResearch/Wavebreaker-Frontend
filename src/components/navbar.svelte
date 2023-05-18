<script>
	import logo from '$lib/assets/wavebreaker_icon.svg';

	import { userInfo } from '$lib/stores';
	console.log($userInfo);
</script>

<div class="navbar bg-base-100 sticky top-0 z-50">
	<div class="flex-none navbar-start">
		<a href="/" class="btn btn-ghost normal-case text-2xl">
			<img src={logo} class="h-8 mr-4" alt="Wavebreaker logo" />
			<span>Wavebreaker</span>
		</a>
	</div>
	<div class="flex-none navbar-end">
		{#if $userInfo != null}
			<a href="/user/{$userInfo.id}" class="normal-case mr-4">{$userInfo.username}</a>
		{:else}
			<a href="/login" class="btn btn-primary btn-sm normal-case mr-4">Sign in</a>
		{/if}
	</div>
</div>
