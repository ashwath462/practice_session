<script lang="ts">
    import FlightDetails from "$lib/components/FlightDetails.svelte"
    import SearchCards from "$lib/components/LandingPage/FlightCards.svelte";
	import { cardType } from "$lib/utils/constants";
</script>


<FlightDetails/>
<SearchCards title="Upcoming Flights" type={cardType.upcomingFlight}/>
<SearchCards title="Recent Search" type={cardType.recentSearch}/>