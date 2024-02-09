<script lang="ts">
	import { cardType } from "$lib/utils/constants";
    import Border from "../common/Border.svelte";
    import SearchCards from "./SearchCards.svelte";
    import type { CityDetails } from "$lib/models/CityDetails.model";
    import { flightDetails } from "$lib/store/FlightDetails.store";
	import { goto } from "$app/navigation";
    export let title:string;
    export let type:string;
    export let cities: CityDetails[];

    const selectCity = (item:any)=>{
        if(type === "source") $flightDetails.src = item;
        else $flightDetails.des = item;
        goto('/FlightsPage')
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