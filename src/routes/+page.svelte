<script>
    import FlightDetails from "$lib/components/FlightDetails.svelte"
	import FlightSearchResult from "$lib/components/FlightSearchResult/FlightSearchResult.svelte";
    import SearchCards from "$lib/components/LandingPage/FlightCards.svelte";
    import SourceDestinationSelector from "$lib/components/LandingPage/SourceDestinationSelector.svelte";
    import SearchFlights from "$lib/components/SearchCity/SearchCity.svelte";
</script>

<div class="pb-12">
    <!-- route1 -->
    <!-- <SourceDestinationSelector/>
    <FlightDetails/>
    <SearchCards title={"Upcoming Flights"}/>
    <SearchCards/> -->

    <!--  route2 -->
    <!-- <SearchFlights/> -->

    <!-- route3 -->
    <FlightSearchResult/>
</div>
