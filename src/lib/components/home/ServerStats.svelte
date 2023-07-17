<script lang="ts">
	export let userCount: number;
	export let songCount: number;
	export let scoreCount: number;
</script>

<div class="stats stats-vertical md:stats-horizontal grow rounded-xl bg-neutral shadow w-full">
	<div class="stat">
		<div class="stat-value text-3xl lg:text-4xl">{userCount}</div>
		<div class="stat-title">players registered</div>
	</div>
	<div class="stat">
		<div class="stat-value text-3xl lg:text-4xl">{songCount}</div>
		<div class="stat-title">songs registered</div>
	</div>
	<div class="stat">
		<div class="stat-value text-3xl lg:text-4xl">{scoreCount}</div>
		<div class="stat-title">scores submitted</div>
	</div>
</div>
