<script lang="ts">
	export let showModal: boolean;
	export let responsive: boolean = true;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="modal {responsive ? 'modal-bottom sm:modal-middle' : 'modal-middle'} text-base-content"
>
	<form method="dialog" class="modal-box">
		<slot />
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
