<script lang="ts">
    import { cardType } from "$lib/utils/constants";
    import TravelDetailCard from "./FlightCards.svelte";
    import Location from "$lib/images/Location.svelte";
    import RecentSearch from "$lib/images/RecentSearch.svelte";
	import { getUpcomingFlightData } from "$lib/store/flights.api";
	import { onMount } from "svelte";
	import { getCachedSearchFlight } from "$lib/store/flights.local";
    export let type:cardType = cardType.recentSearch;
    export let title:string = "Recent Searches";

    let cardData:any[] = [];
    onMount(async()=>{
        if(type === cardType.recentSearch){
            const data = await getCachedSearchFlight();
            cardData = data;
        } 
        else{
            const data = await getUpcomingFlightData();
            cardData = data.booking;
        }
        console.log(cardData);
    })
</script>


<div class="flex flex-col p-4 w-full">
    <div>{title}</div>
    <div class="carousel space-x-6 ">
        {#each cardData as item}
            <div class="carousel-item w-5/6 max-w-[700px] min-w-[270px]">
                <TravelDetailCard data={item}>
                    {#if type === cardType.recentSearch}
                    <RecentSearch/>
                    {:else}
                    <img class="max-w-16" src={item.imageUrl} alt="">
                    {/if}
                </TravelDetailCard>
            </div>
        {/each}
    </div>
</div>