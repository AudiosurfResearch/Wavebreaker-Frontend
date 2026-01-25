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

<div class="flex flex-col items-center">
    <h1
        class="text-9xl font-extrabold m-auto bg-clip-text bg-linear-to-b from-foreground to-muted text-transparent"
    >
        {page.status}
    </h1>
    <div class="flex flex-col relative bottom-8 items-center">
        <p class="text-xl">{page.error?.message}</p>
        <a
            href={randomText.url}
            class="text-muted-foreground italic text-sm underline-offset-4 hover:underline"
            >{randomText.lyric}</a
        >
    </div>
</div>
