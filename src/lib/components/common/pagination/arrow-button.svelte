<script lang="ts">
	export let icon: string;
	export let size = 'is-small';
	export let disabled = false;

	$: iconSize = `icon ${size ?? ''}`;
	$: fasIcon = `fas ${icon ?? ''}`;
</script>

<button class="button" on:click {disabled}>
	<span class={iconSize}>
		<i class={fasIcon} />
	</span>
</button>
