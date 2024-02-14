<script lang="ts">
    import DownArrow from "$lib/images/DownArrow.svelte";
    import TravellerModal from "./TravellerModal.svelte";
    import { flightDetails } from "$lib/store/FlightDetails.store";
    import { travellClassValue } from "$lib/store/TravellClass.store";
    // @ts-ignore
    const showModal = ()=>document.getElementById('travelModal').showModal();
    $: data = $flightDetails;
    $: travellersCount = data.adultCount + data.childCount + data.infantCount;
    $: travellClass = $travellClassValue.value.split(' ')[0];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card bg-base-100 py-4 px-2 m-4 cursor-pointer rounded-sm" on:click={()=>{showModal()}} >
    <div class="flex">
        <div class="w-1/2">
            <div class="text-xs font-light">Class</div>
            <div class="flex">
                {#if travellClass}
                    <div>{travellClass}</div>
                {:else}
                    <div>-</div>
                {/if}
                <div class="mx-8"><DownArrow/></div>
            </div>
        </div>
        <div class="w-1/2 border-l-2 pl-4 ">
            <div class="text-xs font-light">Traveller</div>
            <div class="flex">
                <div>{travellersCount}</div>
                <div class="mx-8"><DownArrow/></div>
            </div>
        </div>
    </div>
    <TravellerModal/>
</div>