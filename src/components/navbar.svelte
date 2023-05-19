<script>
	import logo from '$lib/assets/wavebreaker_icon.svg';

	import { page } from '$app/stores';
	import { dev } from '$app/environment';
</script>

<div class="navbar bg-base-100 sticky top-0 z-50">
	<div class="flex-none navbar-start">
		<a href="/" class="btn btn-ghost normal-case text-2xl">
			<img src={logo} class="h-8 mr-4" alt="Wavebreaker logo" />
			<span>Wavebreaker</span>
			{#if dev}
				<div class="ml-2 badge badge-outline badge-warning badge-sm">dev</div>
			{/if}
		</a>
	</div>
	<div class="flex-none navbar-end">
		{#if $page.data.user}
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div tabindex="0" class="btn btn-ghost normal-case">
					<div class="avatar">
						<div class="w-8 rounded-lg">
							<img src={$page.data.user.avatarUrl} alt="Avatar of {$page.data.user.username}" />
						</div>
					</div>
					<div class="text-base ml-4">{$page.data.user.username}</div>
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
					<li class="menu-title">
						<span>{$page.data.user.username}</span>
					</li>
					<li><a href="/user/{$page.data.user.id}">Profile</a></li>
					<li>
						<form action="/logout" method="POST">
							<button type="submit">Log out</button>
						</form>
					</li>
				</ul>
			</div>
		{:else}
			<a href="/login" rel="external" class="btn btn-primary btn-sm normal-case mr-4">Sign in</a>
		{/if}
	</div>
</div>
