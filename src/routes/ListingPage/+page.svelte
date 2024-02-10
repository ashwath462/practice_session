<script>
    import FlightSearchResult from "$lib/components/Listing Page/ListingResult.svelte";
    import { NavBarDetails } from "$lib/store/NavBar.store";

    $NavBarDetails.type = "ListingPage";
</script>

<div class="pb-12">
    <FlightSearchResult/>
</div>