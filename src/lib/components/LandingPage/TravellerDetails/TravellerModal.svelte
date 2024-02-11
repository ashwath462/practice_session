<script lang="ts">
	import SearchFlightButton from '../SearchFlightButton.svelte';
	import Close from '$lib/images/Close.svelte';
	import ModalBoundary from '$lib/images/ModalBoundary.svelte';
	import { flightDetails } from '$lib/store/FlightDetails.store';
	import { onMount } from 'svelte';
	import GuestDetails from './GuestDetails.svelte';
	import TravellClassSelector from './TravellClassSelector.svelte';
	import { travellClassValue } from '$lib/store/TravellClass.store';
	
	$: travellerData = $flightDetails.guests;
	$: totalGuest = $flightDetails.adultCount + $flightDetails.childCount + $flightDetails.infantCount;
	let error:string = "" 
	$: travellClass = $flightDetails.travellers
	onMount(()=>{
		$travellClassValue = travellClass[0];
	})


</script>

<dialog id="travelModal" class="modal modal-bottom">
	<div class="modal-box p-0 m-0">
		
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="flex flex-col mb-3">
			<div class="flex">
				<div class="w-full flex place-items-center place-content-center ml-16"><ModalBoundary/></div>
				<div class="modal-action mt-4 mx-4">
					<form method="dialog">
						<button ><Close/></button>
					</form>
				</div> 
			</div>
			<div class="text-xl font-bold mx-4">Select Traveller(s)</div>
				<GuestDetails guestData={travellerData[0]} bind:count={$flightDetails.adultCount} totalGuest={totalGuest} bind:error={error}/>
				<GuestDetails guestData={travellerData[1]} bind:count={$flightDetails.childCount} totalGuest={totalGuest} bind:error={error}/>
				<GuestDetails guestData={travellerData[2]} bind:count={$flightDetails.infantCount} totalGuest={totalGuest} bind:error={error}/>
			<div class="px-4 text-sm text-red-500">{error}</div>
			
			<div class="flex flex-col px-4 py-3">
				<div class="text-xl font-bold">Select Class</div>
				{#each travellClass as item}
					<TravellClassSelector data={item} bind:travellClassValue={$travellClassValue}/>
				{/each}
			</div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="flex justify-center">
                <form method="dialog" class="w-[100vw]">
                    <button class="w-full">
                        <SearchFlightButton type="Proceed" />
                    </button>
                </form>
            </div>
		</div>
	</div>
</dialog>