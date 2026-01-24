<script lang="ts">
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";

    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button onclick={toggleMode} variant="ghost" size="icon">
    <SunIcon class="h-[1.2rem] w-[1.2rem] dark:hidden" />
    <MoonIcon class="absolute h-[1.2rem] w-[1.2rem] hidden dark:block" />
    <span class="sr-only">Toggle theme</span>
</Button>
