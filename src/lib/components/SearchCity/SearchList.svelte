<script lang="ts">
	import { cardType } from "$lib/utils/constants";
    import Border from "../common/Border.svelte";
    import SearchCards from "./SearchCards.svelte";
    import type { CityDetails } from "$lib/models/CityDetails.model";
    import { flightDetails } from "$lib/store/FlightDetails.store";
	import { goto } from "$app/navigation";
	import { cacheCity } from "$lib/store/flights.local";
	import { NavBarDetails } from "$lib/store/NavBar.store";
    export let title:string;
    export let type:string;
    export let cities: CityDetails[];
    export let error: string = "";

    const selectCity = (item:any)=>{
        if(type === "source" && $flightDetails.des.city != item.city) $flightDetails.src = item;
        else if(type === "destination" && $flightDetails.src.city != item.city) $flightDetails.des = item;
        else {
            error = 'Source and destination cannot be same';
            return;
        }
        error = "";
        cacheCity(item);
        if($NavBarDetails.redirected === 'modal') goto('/ListingPage')
        else goto('/FlightsPage');
    }
</script>



<div class="font-bold p-4">
    {title}
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#each cities as city}
    <Border/>
    <div class="mx-4 border-b-2" on:click={()=>{selectCity(city)}}>
        <SearchCards city={city}/>
    </div>
{/each}