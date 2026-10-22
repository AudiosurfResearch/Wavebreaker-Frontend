<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="m-auto flex flex-col items-center space-x-4 self-center md:flex-row">
	<h1 class="text-9xl font-bold">{page.status}</h1>
	<div class="flex flex-col">
		<h2 class="text-4xl">{page.error?.message}</h2>
		<a
			href={page.error?.randomLyric?.url}
			target="_blank"
			rel="noopener noreferrer external"
			class="text-muted-foreground italic underline-offset-4 hover:underline"
		>
			"{page.error?.randomLyric?.lyric}"
		</a>
	</div>
</div>
