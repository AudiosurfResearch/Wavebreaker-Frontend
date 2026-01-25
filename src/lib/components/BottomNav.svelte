<script lang="ts">
    import HomeIcon from "@lucide/svelte/icons/home";
    import UserIcon from "@lucide/svelte/icons/user";
    import MusicIcon from "@lucide/svelte/icons/music";
    import TrophyIcon from "@lucide/svelte/icons/trophy";

    import { page } from "$app/state";

    let isRoot = $derived(page.url.pathname == "/");
    let isUserPage = $derived(page.url.pathname.startsWith("/users"));
    let isSongPage = $derived(page.url.pathname.startsWith("/songs"));
    let isRankingPage = $derived(page.url.pathname.startsWith("/rankings"));
</script>

<div
    class="flex sm:hidden flex-row items-center justify-around w-full h-16 fixed left-0 bottom-0 right-0 z-50 bg-background drop-shadow-xl border-t"
>
    <a href="/" class="w-full" class:text-primary={isRoot}>
        <HomeIcon class="m-auto" />
    </a>
    <a href="/users/search" class="w-full" class:text-primary={isUserPage}>
        <UserIcon class="m-auto" />
    </a>
    <a href="/songs/search" class="w-full" class:text-primary={isSongPage}>
        <MusicIcon class="m-auto" />
    </a>
    <a href="/rankings/users" class="w-full" class:text-primary={isRankingPage}>
        <TrophyIcon class="m-auto" />
    </a>
</div>
