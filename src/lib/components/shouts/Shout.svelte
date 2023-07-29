<script lang="ts">
	import type { Shout } from '$lib/models/ShoutData';
	import { format } from 'timeago.js';

	export let shout: Shout;
</script>

<div class="flex flex-row gap-x-2">
	<img loading="lazy" class="avatar w-12 h-12 shrink-0 rounded-xl" src={shout.author.avatarUrlMedium} alt="Avatar" />
	<div class="flex flex-col min-w-0">
		<div class="flex flex-row gap-x-2">
			<a href="/users/{shout.authorId}" class="font-semibold">{shout.author.username}</a>
			<p class="text-base-content/60">{format(shout.timeCreated)}</p>
		</div>
		<p class="break-words">
			{shout.content}
        </p>
	</div>
</div>
