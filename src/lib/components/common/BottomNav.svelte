<script lang="ts">
	import { faHome, faChartColumn, faUser, faMusic } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
</script>

<div class="btm-nav z-50 drop-shadow-xl lg:hidden">
	<button class="text-primary">
		<Fa icon={faHome} />
	</button>
	<button class="text-primary">
		<Fa icon={faUser} />
	</button>
	<button class="text-primary">
		<Fa icon={faMusic} />
	</button>
</div>
