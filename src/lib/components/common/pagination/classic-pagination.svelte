<script lang="ts">
	import PaginationNav from '$lib/components/common/pagination/pagination-nav.svelte';

	export let totalItems: number;
	export let pageSize: number;
	export let currentPage: number;
	export let changePage: any;
</script>

<div>
	<PaginationNav
		{totalItems}
		{pageSize}
		{currentPage}
		limit={1}
		showStepOptions={true}
		on:setPage={(e) => changePage(e.detail.page)}
	/>
</div>
