<script lang="ts">
	import type { UserInfo } from '$lib/models/UserData';
	import UserRoleBadge from './UserRoleBadge.svelte';

	export let targetUser: UserInfo;
</script>

<div
	class="flex mx-5 gap-y-2 items-center flex-col
    md:flex-row md:space-x-5"
>
	<div class="avatar">
		<div class="max-w-xs lg:max-w-sm rounded-3xl shadow">
			<img src={targetUser.avatarUrl} alt="Avatar of {targetUser.username}" />
		</div>
	</div>
	<div class="flex flex-col items-center md:items-start space-y-2">
		<h1 class="max-w-sm lg:max-w-4xl text-3xl md:text-5xl font-bold break-all">
			{targetUser.username}
		</h1>
		<UserRoleBadge {targetUser} />
	</div>
</div>
