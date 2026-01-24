<script lang="ts">
    import { dev } from "$app/environment";

    import { Button } from "$lib/components/ui/button/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import wavebreakerIcon from "$lib/assets/wavebreaker-icon.svg";
    import DarkModeToggle from "./DarkModeToggle.svelte";
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
                </Button>
                {#if dev}
                    <Badge class="text-warning-foreground bg-warning">
                        development
                    </Badge>
                {/if}
            </div>
            <div class="order-1 hidden md:inline-flex items-center shrink-0">
                <div>placeholder</div>
            </div>
            <div
                class="order-2 inline-flex items-center mr-4 justify-end w-1/2"
            >
                <DarkModeToggle />
            </div>
        </div>
    </div>
</header>
