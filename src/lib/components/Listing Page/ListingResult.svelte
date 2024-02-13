<script>
	import ListingCard from "./ListingCard.svelte";
    import Border from "../common/Border.svelte";
	import { flightResults } from "$lib/store/FlightResults.store";
	import Loader from "../common/Loader.svelte";
	import { onMount } from "svelte";
	import { NavBarDetails } from "$lib/store/NavBar.store";

    $: resultCard = $flightResults;

    let loading = true;
    onMount(()=>{
        if($NavBarDetails.redirected === 'modal'){
            document.getElementById('modifyFlightModal').showModal();
            
        }
        setTimeout(()=>{
            loading = false;
        },3000);
        console.log(resultCard);
    })
</script>


<div class="flex flex-col">
    {#if (resultCard.length)}
        {#each resultCard as item}
            <ListingCard data={item}/>
            <Border/>
        {/each}
    {:else if (loading)}
            <Loader/>
    {:else}
        <div class="w-full h-[70vh] flex justify-center items-center font-bold text-2xl">No Flights found</div>
    {/if}
</div>