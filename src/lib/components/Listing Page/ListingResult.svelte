<script>
	import ListingCard from "./ListingCard.svelte";
    import Divider from "../common/Divider.svelte";
	import { flightResults } from "$lib/store/FlightResults.store";
	import Loader from "../common/Loader.svelte";
	import { onMount } from "svelte";
	import { NavBarDetails } from "$lib/store/NavBar.store";

    $: resultCard = $flightResults;

    let loading = true;
    onMount(()=>{
        if($NavBarDetails.redirected === 'modal'){
            // @ts-ignore
            document.getElementById('modifyFlightModal').showModal();
        }
        // console.log(resultCard);
    })
</script>


<div class="flex flex-col">
    {#if resultCard != null}
        {#if (resultCard.length)}
            {#each resultCard as item}
                <ListingCard data={item}/>
                <Divider/>
            {/each}
        {:else}
            <div class="w-full h-[70vh] flex justify-center items-center font-bold text-2xl">No Flights found</div>
        {/if}
    {:else}
        <Loader/>
    {/if}
    
</div>