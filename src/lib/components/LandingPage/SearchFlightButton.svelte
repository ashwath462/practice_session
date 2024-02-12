<script lang="ts">
	import { goto } from "$app/navigation";
    import { flightDetails } from "$lib/store/FlightDetails.store";
	import { flightResults } from "$lib/store/FlightResults.store";
	import { travellClassValue } from "$lib/store/TravellClass.store";
    import { searchFlight } from "$lib/store/flights.api";
	import { cacheSearchFlight } from "$lib/store/flights.local";
    export let type:string;
    let loading:boolean = false;
    
    const handleClick = async ()=>{
        const data = $flightDetails;
        const travellDetails = $travellClassValue;
        if(loading == false){
            loading = true;
            const passengerDetails = {
                adultCount: data.adultCount,
                infantCount: data.infantCount,
                childCount: data.childCount
            };
                
            const body = {
                src: data.src,
                des: data.des,
                departDate: data.departDate,
                partnerCountry: data.partnerCountry,
                passenger: passengerDetails,
                travellerClass:{
                    key: travellDetails.key,
                    value: travellDetails.value,
                },
                appliedSortFilter: data.defaultSortFilter
            }
            console.log(body);
            const result = await searchFlight(body);
            cacheSearchFlight(body);
            $flightResults = result.onwardFlights;
            console.log(result.onwardFlights);
            loading = false;
            goto('/ListingPage')
        }
    }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex justify-center w-full">
    <button class="mx-3 text-center w-full">
        <div on:click={()=>{handleClick()}} class:btn-disabled={loading} class="btn btn-block btn-info text-white font-bold text-lg">
            {type}
        </div>
    </button>
</div>