<script lang="ts">
	import { cardType } from "$lib/utils/constants";
    import Refundable from "$lib/images/Refundable.svelte";
    import NonRefundable from "$lib/images/NonRefundable.svelte";
    import FreeMeals from "$lib/images/FreeMeals.svelte";
    import type { FlightSearchResult } from "$lib/models/ListingCardDetails.model";
    
    export let data:FlightSearchResult;
</script>

<div class="card p-4">
    <div class="flex justify-between">
        <div class="">
            <img class="max-h-20 py-1" src={data.onwardSegmentDetails.segmentAirlineInfos[0].airlineIconUrl} alt=""/>
            <div class="text-xs">
                <div>{data.onwardSegmentDetails.segmentAirlineInfos[0].airlineName}</div>
                <!-- <div>Singapore...+2</div> -->
            </div>
        </div>
        <div>
            <div class="font-bold text-center">{data.onwardSegmentDetails.airlineTime}</div>
            <div class="text-xs ">{data.onwardSegmentDetails.airlineDuration}</div>
        </div>
        <div class="font-bold text-green-500">{data.fareList[0].currencySymbol} {data.fareList[0].fareS}</div>
    </div>
    
    <div class="flex text-xs py-4">
        {#if (data.refundable)}
            <div class="flex pr-1"><Refundable/> Refundable</div>
        {:else}
            <div class="flex pr-1"><NonRefundable/> Non-Refundable</div>
        {/if}

        {#if (data.hasFreeMeal)}
            <div class="flex px-1"><FreeMeals/> Free Meals</div>
        <!-- {:else}
            <div>No Free Meals</div> -->
        {/if}           
    </div>
</div>
