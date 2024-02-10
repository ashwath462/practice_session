<script lang="ts">
    import FlightDetails from "$lib/components/LandingPage/FlightDetails.svelte"
    import SearchCards from "$lib/components/LandingPage/FlightLists.svelte";
	import { cardType } from "$lib/utils/constants";
    import { NavBarDetails } from "$lib/store/NavBar.store";
    $NavBarDetails.leftContent = "Flights";
    $NavBarDetails.type = "LandingPage";
</script>


<FlightDetails/>
<SearchCards title="Upcoming Flights" type={cardType.upcomingFlight}/>
<SearchCards title="Recent Search" type={cardType.recentSearch}/>