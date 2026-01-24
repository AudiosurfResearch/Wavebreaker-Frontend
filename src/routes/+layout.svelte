<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";
    import { ModeWatcher } from "mode-watcher";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import Navbar from "$lib/components/Navbar.svelte";

    let { children } = $props();
</script>

<ModeWatcher />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="bg-background relative flex min-h-svh flex-col">
    <Navbar />
    <main class="flex flex-1 flex-col">
        <Tooltip.Provider>
            {@render children()}
        </Tooltip.Provider>
    </main>
</div>
