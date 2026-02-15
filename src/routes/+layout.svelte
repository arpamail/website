<script lang="ts">
    import { page } from "$app/state";
    import favicon from "$lib/assets/favicon.svg";
    import "./app.css";

    let { children } = $props();

    const description = "Anonymous & private email aliases that let you reply.";
</script>

<svelte:head>
    <title>ArpaMail - Anonymous & Private Email Aliases</title>
    <link rel="icon" href={favicon} />
    <link rel="canonical" href={new URL(page.url.pathname, page.url.origin).href} />
    <meta name="description" content={description} />
    <meta property="og:title" content="ArpaMail - Anonymous & Private Email Aliases" />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://arpamail.lemonyte.com" />
    <meta property="og:site_name" content="ArpaMail" />
</svelte:head>

<div class="w-svw max-w-svw min-h-screen">
    <div class="flex flex-col items-center gap-8 my-8 mx-4 md:mx-8">
        <div class="flex flex-col prose prose-zinc prose-invert font-mono">
            <div class="self-center flex flex-col items-center">
                <a href="/" class="hover:brightness-75 no-underline">
                    <h1 class="mb-2 flex flex-row gap-4 items-center">
                        <img src={favicon} alt="ArpaMail logo" class="inline h-12 not-prose" />
                        <span class="text-6xl font-bold text-accent-light">ArpaMail</span>
                    </h1>
                </a>
                <span class="uppercase text-lg">Anonymous & private email aliases</span>
            </div>
        </div>
        <div
            class="flex flex-col max-w-full sm:max-w-xl prose prose-sm md:prose-base prose-zinc prose-invert font-mono"
        >
            <div class="">
                {@render children()}
            </div>
        </div>
        <footer class="mt-16 prose prose-zinc prose-invert font-mono">
            <span>&copy; {new Date().getFullYear()} ArpaMail</span>
        </footer>
    </div>
</div>
