<script lang="ts">
	import { cardType } from "$lib/utils/constants";
	import RecentSearchIcon from "$lib/images/RecentSearch.svelte";
    import LocationIcon from "$lib/images/Location.svelte";

    export let type:cardType = cardType.recentSearch;
</script>

<div class="card w-5/6 max-w-[700px] cursor-pointer !rounded-md">
    <div class="flex justify-between p-2 max-w-[700px] min-w-[270px] py-4">
        <div class="m-auto">
            {#if type === cardType.recentSearch}
                <RecentSearchIcon/>
            {:else}
                <LocationIcon/>
            {/if}
        </div>
        <div class="mx-2 w-5/6">
            <div class="">
                Bangalore
            </div>
            <div class="text-xs font-light">
                Sun, Dec-17 - Tue, Dec 19
            </div>
        </div>
    </div>
</div>