<script lang="ts">
import { dev } from "$app/environment";
import { page } from "$app/state";

import wavebreakerIcon from "$lib/assets/wavebreaker-icon.svg";
import DarkModeToggle from "$lib/components/DarkModeToggle.svelte";
import { Badge } from "$lib/components/ui/badge/index.js";
import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
import { Button } from "$lib/components/ui/button/index.js";

import HomeIcon from "@lucide/svelte/icons/home";
import MusicIcon from "@lucide/svelte/icons/music";
import TrophyIcon from "@lucide/svelte/icons/trophy";
import UserIcon from "@lucide/svelte/icons/user";

let isRoot = $derived(page.url.pathname === "/");
let isUserPage = $derived(page.url.pathname.startsWith("/users"));
let isSongPage = $derived(page.url.pathname.startsWith("/songs"));
let isRankingPage = $derived(page.url.pathname.startsWith("/rankings"));
</script>

<header class="bg-background sticky top-0 z-50 w-full">
    <div class="container-wrapper">
        <div class="flex h-16 items-center justify-between mx-auto px-2">
            <div class="order-1 inline-flex items-center justify-start w-1/2">
                <Button href="/" variant="ghost" class="flex gap-4 h-12">
                    <img
                        alt="Wavebreaker logo"
                        class="w-8"
                        src={wavebreakerIcon}
                    />
                    <div class="hidden sm:block text-2xl font-semibold">
                        Wavebreaker
                    </div>
                    {#if dev}
                        <Badge class="text-warning-foreground bg-warning">
                            development
                        </Badge>
                    {/if}
                </Button>
            </div>
            <div class="order-1 hidden md:inline-flex items-center shrink-0">
                <ButtonGroup.Root>
                    <Button
                        href="/"
                        variant="ghost"
                        size="sm"
                        class={{ "text-primary": isRoot }}
                    >
                        <HomeIcon /> Home
                    </Button>
                    <Button
                        href="/users/search"
                        variant="ghost"
                        size="sm"
                        class={{ "text-primary": isUserPage }}
                    >
                        <UserIcon /> Users
                    </Button>
                    <Button
                        href="/songs/search"
                        variant="ghost"
                        size="sm"
                        class={{ "text-primary": isSongPage }}
                    >
                        <MusicIcon /> Songs
                    </Button>
                    <Button
                        href="/rankings"
                        variant="ghost"
                        size="sm"
                        class={{ "text-primary": isRankingPage }}
                    >
                        <TrophyIcon /> Rankings
                    </Button>
                </ButtonGroup.Root>
            </div>
            <div
                class="order-2 inline-flex items-center mr-4 justify-end w-1/2"
            >
                <DarkModeToggle />
            </div>
        </div>
    </div>
</header>
