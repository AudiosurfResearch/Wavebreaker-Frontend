<script lang="ts">
import * as Card from '$lib/components/ui/card';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
</script>

<Card.Root class="w-full max-w-full sm:max-w-sm">
	<Card.Header>
		<Card.Title>Global stats</Card.Title>
		<Card.Description>
            Server-wide statistics across all of Wavebreaker!
        </Card.Description>
	</Card.Header>
	<Card.Content>
        {#if !data.serverStats.error}
            <div class="flex flex-col space-y-3">
                <div>
                    <p class="text-4xl font-bold">
                        {data.serverStats.data?.userCount}
                    </p>
                    <h1>registered users</h1>
                </div>
                <div>
                    <p class="text-4xl font-bold">
                        {data.serverStats.data?.scoreCount}
                    </p>
                    <h1>scores submitted</h1>
                </div>
                <div>
                    <p class="text-4xl font-bold">
                        {data.serverStats.data?.songCount}
                    </p>
                    <h1>songs registered</h1>
                </div>
            </div>
        {:else}
            <p class="text-destructive">Something went wrong! {data.serverStats.error}</p>
        {/if}
    </Card.Content>
</Card.Root>
