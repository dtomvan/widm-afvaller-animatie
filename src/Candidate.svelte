<script lang="ts">
    import { remCandidate, setFinalCandidate } from "./stores";

    export let name: string;
    export let isMol: boolean;
    export let gaatErUit: boolean;

    function handleRem() {
        remCandidate(name);
    }

    function handleGaatErUit() {
        setFinalCandidate(name);
    }
</script>

<li>
    <input
        type="radio"
        name="gaatErUit"
        on:change={handleGaatErUit}
        checked={gaatErUit}
    />
    {name}
    {#if isMol}
        <b>de Mol</b>
    {/if}
    <button on:click={handleRem}>x</button>
</li>
