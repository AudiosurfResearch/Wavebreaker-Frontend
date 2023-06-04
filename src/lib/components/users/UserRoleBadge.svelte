<script lang="ts">
	import type { UserInfo } from '$lib/models/UserData';
	import UserBadge from './UserBadge.svelte';
	import teamBadgeIcon from '$lib/assets/wavebreaker_icon_white.svg';

	export let targetUser: UserInfo;
</script>

{#if targetUser.accountType == 3}
	<UserBadge
		classExt="bg-gradient-to-r from-teal-400 to-primary"
		imgSrc={teamBadgeIcon}
		label={'Wavebreaker Team'}
	/>
{:else if targetUser.accountType == 2}
	<UserBadge classExt="bg-error" label={'Moderator'} />
{/if}
