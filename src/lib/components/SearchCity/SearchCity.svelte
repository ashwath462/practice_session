<script lang="ts">
    import { getSearchCityData } from '$lib/store/flights.api';
    import Search from "$lib/images/Search.svelte"
	import SearchList from "./SearchList.svelte";
    import type { CityDetails } from "$lib/models/CityDetails.model";
	import Close from '$lib/images/Close.svelte';
    export let type:string;
    let city = "", searchListItems:CityDetails[] = [];
    const handleInput = async()=>{
        const data = await getSearchCityData(city);
        console.log(data);
        searchListItems = data.airportList;
        console.log(searchListItems);
    }
</script>


<div class="flex flex-col w-full">
    <div class="join p-2">
        <input bind:value={city} on:input={()=>{handleInput()}} type="text" placeholder="Enter City/Airport Name" class="input join-item w-full text-sm" />
        {#if (city.trim() === "")}
            <div class="btn join-item bg-white border-none">
                <Search/>
            </div>
            {:else}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={()=>{city = ""}} class="btn join-item bg-white border-none">
                <Close/>
            </div>
            {/if}
    </div>
    <div class="flex flex-col">
        {#if (searchListItems.length === 0)}
            <SearchList type={type} title = "Recent Searches" cities={searchListItems}/>
            <SearchList type={type} title = "Popular cities" cities={searchListItems}/>
        {:else}
            <SearchList type={type} title = "Search cities" cities={searchListItems}/>
        {/if}
    </div>
</div>