<script lang="ts">
    import "./layout.css";
    import faviconPng from "$lib/assets/favicon.png";
    import faviconSvg from "$lib/assets/wavebreaker-icon.svg";
    import { ModeWatcher } from "mode-watcher";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import Navbar from "$lib/components/Navbar.svelte";
    import BottomNav from "$lib/components/BottomNav.svelte";

    let { children } = $props();
</script>

<ModeWatcher />
<svelte:head>
    <link rel="icon" href={faviconSvg} type="image/svg+xml" />
    <link rel="icon" href={faviconPng} type="image/png" />
</svelte:head>
<div class="bg-background relative flex min-h-svh flex-col items-center">
    <Navbar />
    <main class="flex flex-1 flex-col w-full max-w-7xl p-4">
        <Tooltip.Provider>
            {@render children()}
        </Tooltip.Provider>
    </main>
    <BottomNav />
</div>
