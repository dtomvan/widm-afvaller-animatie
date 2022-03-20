<script lang="ts">
    import { appWindow } from "@tauri-apps/api/window";
    import { onMount } from "svelte";
    import { addCandidate, players, visible } from "./stores";
    import Candidate from "./Candidate.svelte";

    // BAR
    import ico_minimize from "./assets/minimize.svg";
    import ico_maximize from "./assets/maximize.svg";
    import ico_close from "./assets/close.svg";

    let minimize: HTMLDivElement,
        maximize: HTMLDivElement,
        close: HTMLDivElement,
        candidates: [string, boolean, boolean][],
        manager_visible: boolean,
        requestedPlayer: string;

    let name = "";
    let isMol = false;
    let scherm = false;
    let currentGaatErUit = false;

    onMount(() => {
        minimize.addEventListener("click", () => appWindow.minimize());
        maximize.addEventListener("click", () => appWindow.toggleMaximize());
        close.addEventListener("click", () => appWindow.close());
    });

    function handleAdd() {
        addCandidate(name, isMol);
        name = "";
    }

    function handleChoose() {
        let entry = candidates.find((a) => a[0] == requestedPlayer);
        requestedPlayer = "";
        if (entry == undefined) {
            currentGaatErUit = false;
            return;
        }
        scherm = true;
        setTimeout(() => (scherm = false), 5000);
        currentGaatErUit = entry[2];
    }

    function toggleManager() {
        visible.set(!manager_visible);
    }

    players.subscribe((value) => {
        candidates = value;
    });

    visible.subscribe((value) => {
        manager_visible = value;
    });
</script>

<main>
    <div data-tauri-drag-region class="titlebar">
        <div
            bind:this={minimize}
            class="titlebar-button"
            id="titlebar-minimize"
        >
            <img src={ico_minimize} alt="minimize" />
        </div>
        <div
            bind:this={maximize}
            class="titlebar-button"
            id="titlebar-maximize"
        >
            <img src={ico_maximize} alt="maximize" />
        </div>
        <div bind:this={close} class="titlebar-button" id="titlebar-close">
            <img src={ico_close} alt="close" />
        </div>
    </div>

    <h1>WIE IS DE MOL?</h1>

    <p />
    <button on:click={toggleManager}>toggle de manager</button>
    <p />

    {#if !manager_visible}
        <style>
            .manager {
                display: none;
            }
        </style>
    {/if}
    <div class="manager">
        Voeg een nieuwe kandidaat toe:
        <form onSubmit="return false;" on:submit={handleAdd}>
            <input type="text" placeholder="naam" bind:value={name} />
            <input type="checkbox" bind:checked={isMol} />
            <button type="submit">+</button>
        </form>

        <ul>
            {#each candidates as [name, isMol, gaatErUit]}
                <Candidate {name} {isMol} {gaatErUit} />
            {/each}
        </ul>
    </div>

    <p />
    <form onSubmit="return false;" on:submit={handleChoose}>
        <input
            type="text"
            style="font-size: 28pt"
            placeholder="Typ een naam..."
            bind:value={requestedPlayer}
        />
    </form>

    {#if currentGaatErUit}
        <style>
            div.scherm {
                background-color: #ff0000!important;
            }
        </style>
    {/if}

    {#if scherm}
        <div class="scherm" />
    {/if}
</main>

<style lang="scss">
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    div.scherm {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        background-color: #00ff00;
        animation: fadein 0.2s;
    }
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    :global {
        button {
            border: 0;
            color: #fff;
            background-color: #1e945c;
        }

        button:hover {
            background-color: #3bc67c;
        }

        h1 {
            color: #1e945c;
            text-transform: uppercase;
            font-weight: 100;
            line-height: 1.1;
            margin: 2rem auto;
            max-width: 14rem;
            font-size: 3rem;
        }
    }

    @media (min-width: 480px) {
        h1 {
            max-width: none;
        }
    }

    .titlebar {
        height: 30px;
        background: #1e945c;
        user-select: none;
        display: flex;
        justify-content: flex-end;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    .titlebar-button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
    }
    .titlebar-button:hover {
        background: #3bc67c;
    }
</style>
