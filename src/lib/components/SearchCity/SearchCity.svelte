<script lang="ts">
    import { getPopularCitiesData, getSearchCityData } from '$lib/store/flights.api';
    import Search from "$lib/images/Search.svelte"
	import SearchList from "./SearchList.svelte";
    import type { CityDetails } from "$lib/models/CityDetails.model";
	import Close from '$lib/images/Close.svelte';
	import { onMount } from 'svelte';
	import { getCachedCities } from '$lib/store/flights.local';
    export let type:string;
    let city = "", searchListItems:CityDetails[] = [], popularCities:CityDetails[] = [], recentSearchedCities:CityDetails[] = [];
    let error:string = "";
    const handleInput = async()=>{
        const data = await getSearchCityData(city);
        searchListItems = data.airportList;
    }

    onMount(async ()=>{
        const data = await getPopularCitiesData();
        popularCities = data?.airportList;

        const localData = await getCachedCities();
        recentSearchedCities = localData;
    })
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
    <div class="mx-4 text-sm text-red-400">{error}</div>
    <div class="flex flex-col">
        {#if (searchListItems.length === 0)}
            {#if (recentSearchedCities.length>=1)}
            <SearchList type={type} title = "Recent Searches" cities={recentSearchedCities} bind:error={error}/>
            {/if}
            <SearchList type={type} title = "Popular cities" cities={popularCities} bind:error={error}/>
        {:else}
            <SearchList type={type} title = "Search cities" cities={searchListItems} bind:error={error}/>
        {/if}
    </div>
</div>