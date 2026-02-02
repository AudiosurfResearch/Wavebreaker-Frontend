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
    class="fixed flex md:hidden flex-row items-center justify-around w-full h-16 left-0 bottom-0 right-0 z-50 bg-background border-t"
>
    <a
        href="/"
        class={[
            isRoot && "text-primary bg-accent",
            "flex flex-col w-full items-center justify-center h-full space-y-1",
        ]}
    >
        <HomeIcon />
        <div class="text-xs">Home</div>
    </a>
    <a
        href="/users/search"
        class={[
            isUserPage && "text-primary bg-accent",
            "flex flex-col w-full items-center justify-center h-full space-y-1",
        ]}
    >
        <UserIcon />
        <div class="text-xs">Users</div>
    </a>
    <a
        href="/songs/search"
        class={[
            isSongPage && "text-primary bg-accent",
            "flex flex-col w-full items-center justify-center h-full space-y-1",
        ]}
    >
        <MusicIcon />
        <div class="text-xs">Songs</div>
    </a>
    <a
        href="/rankings/users"
        class={[
            isRankingPage && "text-primary bg-accent",
            "flex flex-col w-full items-center justify-center h-full space-y-1",
        ]}
    >
        <TrophyIcon />
        <div class="text-xs">Rankings</div>
    </a>
</div>
