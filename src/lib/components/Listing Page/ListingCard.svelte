<script lang="ts">
	import { cardType } from "$lib/utils/constants";
    import Refundable from "$lib/images/Refundable.svelte";
    import NonRefundable from "$lib/images/NonRefundable.svelte";
    import FreeMeals from "$lib/images/FreeMeals.svelte";
    export let data:any;
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


<!-- 
{
    "segmentId": "DEL_BOM_IX_12022024_ECONOMY_0_0_1_0_0_IN_INR_1500_v2",
    "onwardSegmentDetails": {
        "arrivalTime": "",
        "departTime": "",
        "arrivalTimestamp": "1707740100",
        "departTimestamp": "1707730200",
        "duration": "",
        "stops": "",
        "airlineCode": "",
        "sourceAirportCode": {
            "iataCode": "DEL",
            "city": "New Delhi",
            "name": "Indira Gandhi International Airport",
            "countryCode": "",
            "iconUrl": ""
        },
        "destinationAirportCode": {
            "iataCode": "BOM",
            "city": "Mumbai",
            "name": "Chhatrapati Shivaji International Airport",
            "countryCode": "",
            "iconUrl": ""
        },
        "airlineTime": "15:00 - 17:45",
        "airlineDuration": "02h 45m | Non-Stop",
        "segmentAirlineInfos": [
            {
                "airlineName": "Air India Express",
                "airlineIconUrl": "https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/icons/airlines/flights_IX_xxhdpi.png"
            }
        ]
    },
    "refundable": false,
    "hasFreeMeal": false,
    "handBaggageOnlyFare": false,
    "fareList": [
        {
            "fareId": "2_DEL_BOM_IX_12022024_ECONOMY_0_0_1_0_0_IN_INR_1500_v2",
            "partnerId": 0,
            "partnerName": "",
            "fare": 5954,
            "currencySymbol": "₹ ",
            "fareS": "5,954"
        }
    ],
    "specialFeatures": [
        {
            "title": "Refundable",
            "icon": "https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/refundable_xxxhdpi.png"
        }
    ]
} -->