<script lang="ts">
    import { dev } from "$app/environment";

    import { Button } from "$lib/components/ui/button/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
</script>

<header class="bg-background sticky top-0 z-50 w-full">
    <div class="container-wrapper 3xl:fixed:px-0 px-6">
        <div class="3xl:fixed:container flex h-16 items-center gap-2">
            <Button href="/" variant="ghost" class="lg:flex">
                who up waving they breaker
            </Button>
            {#if dev}
                <Badge
                    class="h-5 min-w-5 rounded-full text-warning-foreground bg-warning"
                    variant="outline"
                >
                    development
                </Badge>
            {/if}
        </div>
    </div>
</header>
