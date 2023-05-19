<script lang="ts">
	import '../app.postcss';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';

	import { onMount } from 'svelte';
	import { fetcher } from '$lib/api';
	import { page } from '$app/stores';
</script>

<div class="flex flex-col min-h-screen justify-between">
	<Navbar />
	<div class="flex max-w-7xl self-center items-center w-full p-5"><slot /></div>
	<Footer />
</div>
