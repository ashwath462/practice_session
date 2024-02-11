<script>
	import ListingCard from "./ListingCard.svelte";
    import Border from "../common/Border.svelte";
	import { flightResults } from "$lib/store/FlightResults.store";

    $: resultCard = $flightResults;
</script>


<div class="flex flex-col">
    {#if (resultCard.length)}
        {#each resultCard as item}
            <ListingCard data={item}/>
            <Border/>
        {/each}
    {:else}
        <div class="w-full h-[70vh] flex justify-center items-center font-bold text-2xl">No Flights found</div>
    {/if}
</div>