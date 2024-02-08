<script lang="ts">
    import { cardType } from "$lib/utils/constants";
    import TravelDetailCard from "./FlightSearchCards.svelte";
    import Location from "$lib/images/Location.svelte";
    import RecentSearch from "$lib/images/RecentSearch.svelte";
    export let type:cardType = cardType.recentSearch;
    export let title:string = "Recent Searches";

</script>


<div class="flex flex-col p-4 w-full">
    <div>{title}</div>
    <div class="carousel space-x-6 ">
        {#each {length: 5} as i}
            <div class="carousel-item w-5/6 max-w-[700px] min-w-[270px]">
                <TravelDetailCard>
                        {#if type === cardType.recentSearch}
                            <RecentSearch/>
                        {:else}
                            <Location/>
                        {/if}
                </TravelDetailCard>
            </div>
        {/each}
    </div>
</div>