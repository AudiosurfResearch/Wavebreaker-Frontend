<script lang="ts">
	import type { Shout } from '$lib/models/ShoutData';
	import { format } from 'timeago.js';

	export let shout: Shout;
</script>

<div class="flex flex-row gap-x-2">
	<div class="avatar w-12 h-12 min-w-[3rem]">
		<img class="rounded-xl" src={shout.author.avatarUrl} alt="avatar" />
	</div>
	<div class="flex flex-col">
		<div class="flex flex-row gap-x-2">
			<p class="font-semibold">{shout.author.username}</p>
			<p class="text-base-content/60">{format(shout.timeCreated)}</p>
		</div>
		<p>{shout.content}</p>
	</div>
</div>