<script>
	import Separator from '#lib/components/ui/separator/separator.svelte';
</script>

<footer class="flex w-full">
	<Separator>
		<!-- spacing manually applied via margin on each element
		because space-y-2 will always consider that last element that just exists to push stuff up...
		even if it's hidden -->
		<div class="flex w-full flex-col items-center p-4 text-muted-foreground">
			<p class="mb-2">
				Frontend for Wavebreaker, a custom server for Audiosurf that replaces the original and adds
				unique features.
			</p>
			<p class="mb-2">
				Wavebreaker and the
				<a
					href="https://github.com/AudiosurfResearch/"
					class="text-primary underline-offset-4 hover:underline"
				>
					AudiosurfResearch
				</a>
				GitHub organization are NOT affiliated with Dylan Fitterer or Audiosurf LLC, this is an unofficial
				project!
			</p>
			<p>
				Our custom Audiosurf Radio songs are under a license that permits use in this way, or used
				with explicit permission of the respective artists.
			</p>
			<!-- evil and devious div to push the footer up on mobile... -->
			<div class="h-16 sm:hidden"></div>
		</div>
	</Separator>
</footer>
