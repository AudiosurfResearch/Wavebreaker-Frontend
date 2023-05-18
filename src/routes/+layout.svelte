<script lang="ts">
	import '../app.postcss';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';

	import { onMount } from 'svelte';
	import { fetcher } from '$lib/api';
	import type { UserInfo } from '$lib/models/UserData';
	import { userInfo } from '$lib/stores';

	onMount(async () => {
		const user = await fetcher<UserInfo>('/api/auth/verifyToken');
		userInfo.set(user);
	});
</script>

<div class="flex flex-col min-h-screen justify-between">
	<Navbar />
	<div class="flex max-w-7xl self-center items-center w-full"><slot /></div>
	<Footer />
</div>
