<script lang="ts">
    import { page } from "$app/state";

    type LyricEntry = {
        lyric: string;
        url: string;
    };

    var textArray: LyricEntry[] = [
        {
            lyric: "Don't let me go!",
            url: "https://soundcloud.com/asuzora/dont-ft-ranasol",
        },
    ];
    var randomText = textArray[Math.floor(Math.random() * textArray.length)];
</script>

<div
    class="flex flex-col md:flex-row m-auto self-center items-center space-x-4"
>
    <h1 class="text-9xl font-bold">{page.status}</h1>
    <div class="flex flex-col">
        <h2 class="text-4xl">{page.error?.message}</h2>
        <a
            href={randomText.lyric}
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground italic underline-offset-4 hover:underline"
            >"{randomText.lyric}"
        </a>
    </div>
</div>
