<script lang="ts">
	export let label: string;
	export let imgSrc: string | undefined = undefined;
	export let classExt: string;
</script>

<span class={'inline-flex max-w-fit items-center text-primary-content px-2 rounded-lg ' + classExt}>
	{#if imgSrc}
		<img src={imgSrc} class="h-4 mr-2" alt="Wavebreaker logo" />
	{/if}
	{label}
</span>
