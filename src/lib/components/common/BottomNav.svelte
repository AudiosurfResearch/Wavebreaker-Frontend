<script lang="ts">
	import { faHome, faUser, faMusic } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	import { page } from '$app/stores';
</script>

<div class="btm-nav z-50 drop-shadow-xl lg:hidden">
	<a href="/" class="text-primary" class:active={$page.url.pathname == "/"}>
		<Fa icon={faHome} />
	</a>
	<a href="/users/search" class="text-primary" class:active={$page.url.pathname.startsWith('/users')}>
		<Fa icon={faUser} />
	</a>
	<a href="/songs/search" class="text-primary" class:active={$page.url.pathname.startsWith('/songs')}>
		<Fa icon={faMusic} />
	</a>
</div>
