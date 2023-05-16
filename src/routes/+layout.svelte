<script>
	import '../app.postcss';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
</script>

<div class="flex flex-col min-h-screen justify-between">
	<Navbar />
	<div class="flex max-w-6xl justify-center"><slot /></div>
	<Footer />
</div>
