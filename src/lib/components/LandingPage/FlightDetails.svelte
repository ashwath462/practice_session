<script lang="ts">
	import DateSelector from '$lib/components/LandingPage/DateSelector.svelte';
	import TravellerDetails from '$lib/components/LandingPage/TravellerDetails/TravellerDetails.svelte';
	import SearchFlightButton from '$lib/components/LandingPage/ProceedOrSearchFlightButton.svelte';
	import SourceDestinationSelector from './SourceDestinationSelector.svelte';
	import { NavBarDetails } from '$lib/store/NavBar.store';

	const closeModal = async () => {
		$NavBarDetails.redirected = '';
		// @ts-ignore
		document.getElementById('modifyFlightModal')?.close();
	};
</script>

<SourceDestinationSelector />
<DateSelector />
<TravellerDetails />
<div class="form-control">
	<div class="flex p-2">
		<input type="checkbox" class="checkbox checkbox-sm mx-2" />
		<span class="label-text cursor-pointer"> Show only non-stop flights</span>
	</div>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={() => closeModal()}>
	<SearchFlightButton type="Search Flight" />
</div>
