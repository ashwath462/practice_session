<script lang="ts">
	import FlightDetails from '../LandingPage/FlightDetails.svelte';
	import Close from '$lib/images/Close.svelte';
	import ModalBoundary from '$lib/images/ModalBoundary.svelte';
	import { NavBarDetails } from '$lib/store/NavBar.store';

	// @ts-ignore
	const closeModal = async () => {
		$NavBarDetails.redirected = '';
		// @ts-ignore
		document.getElementById('modifyFlightModal').close();
	};
</script>

<dialog id="modifyFlightModal" class="modal modal-top">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="w-full bg-gray-100 py-5 flex flex-col">
		<div class="flex justify-between p-4">
			<div class="font-bold">Modify Flight</div>
			<button on:click={() => closeModal()}> <Close /> </button>
		</div>
		<FlightDetails />
		<div class="mx-auto mt-4">
			<ModalBoundary />
		</div>
	</div>
</dialog>
