<script lang="ts">
	import { goto } from "$app/navigation";
    import { flightDetails } from "$lib/store/FlightDetails.store";
	import { flightResults } from "$lib/store/FlightResults.store";
	import { travellClassValue } from "$lib/store/TravellClass.store";
    import { searchFlight } from "$lib/store/flights.api";
    export let type:string;

    const handleClick = async ()=>{
        const passengerDetails = {
            adultCount: $flightDetails.adultCount,
            infantCount: $flightDetails.infantCount,
            childCount: $flightDetails.childCount
        };
            
        const body = {
            src: $flightDetails.src,
            des: $flightDetails.des,
            departDate: $flightDetails.departDate,
            partnerCountry: $flightDetails.partnerCountry,
            passenger: passengerDetails,
            travellerClass:{
                key: $travellClassValue.key,
                value: $travellClassValue.value,
            },
            appliedSortFilter: $flightDetails.defaultSortFilter
        }
        console.log(body);

        const result = await searchFlight(body);
        $flightResults = result.onwardFlights;
        console.log(result.onwardFlights);
        goto('/ListingPage')
    }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={()=>{handleClick()}} class="mx-3 flex justify-center">
    <div class="btn btn-block btn-info text-white font-bold text-lg">
        {type}
    </div>
</div>