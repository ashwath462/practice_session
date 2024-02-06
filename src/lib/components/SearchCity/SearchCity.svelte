<script>
    import PopularCities from "./PopularCities.svelte";
import RecentSearches from "./RecentSearches.svelte";
</script>


<div class="flex flex-col w-full">
    <div class="join p-2">
        <input type="text" placeholder="Enter City/Airport Name" class="input join-item w-full text-sm" />
        <div class="btn join-item bg-white border-none">icon</div>
    </div>
    <div class="flex flex-col">
        <RecentSearches/>
        <PopularCities/>
    </div>
</div>