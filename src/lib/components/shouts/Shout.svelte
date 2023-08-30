<script lang="ts">
	import type { Shout } from '$lib/models/ShoutData';
	import type { UserInfo } from '$lib/models/UserData';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { format } from 'timeago.js';

	export let shout: Shout;
	export let currentUser: undefined | UserInfo;
</script>

<div class="flex flex-row gap-x-2">
	<img
		loading="lazy"
		class="avatar w-12 h-12 shrink-0 rounded-xl"
		src={shout.author.avatarUrlMedium}
		alt="Avatar"
	/>
	<div class="flex flex-col min-w-0">
		<div class="flex flex-row gap-x-2">
			<a href="/users/{shout.authorId}" class="font-semibold">{shout.author.username}</a>
			<p class="text-base-content/60">{format(shout.timeCreated)}</p>

			{#if currentUser && (currentUser.id == shout.authorId || currentUser.accountType >= 2)}
				<form method="POST" action="?/deleteShout">
					<input type="hidden" name="shoutId" value={shout.id} />
					<button class="btn btn-square btn-xs btn-ghost text-error"><Fa icon={faTrash} /></button>
				</form>
			{/if}
		</div>
		<p class="break-words">
			{shout.content}
		</p>
	</div>
</div>
