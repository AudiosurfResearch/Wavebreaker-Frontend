<script lang="ts">
	import type { PageData } from './$types';
	import UserDisplay from '../../../components/users/UserDisplay.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Wavebreaker | {data.userResult.username}</title>
</svelte:head>

<div class="flex p-4 gap-4 justify-center items-stretch w-full flex-col">
	<UserDisplay targetUser={data.userResult} />
	<div class="flex p-5 rounded-3xl bg-neutral grow">
		<div class="self-center space-y-2">
			<p>
				<b>Joined {new Date(data.userResult.joinedAt).toLocaleDateString()}</b>
				<br />
			</p>
			<p>
				<b>Total score:</b>
				{data.userResult.totalScore} <br />
				<b>Total plays:</b>
				{data.userResult.totalPlays} <br />
			</p>
			<p>
				<b>Favorite character:</b>
				{data.userResult.favoriteCharacter} <br />
				{#if data.userResult.favoriteSong}
					<b>Favorite song:</b>
					<a class="hover:underline" href="/songs/{data.userResult.id}"
						>{data.userResult.favoriteSong.artist} - {data.userResult.favoriteSong.title}</a
					> <br />
				{/if}
			</p>
		</div>
	</div>
</div>
