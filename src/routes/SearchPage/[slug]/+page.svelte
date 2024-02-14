<script lang="ts">
	import SearchFlights from '$lib/components/SearchCity/SearchCity.svelte';
	import { page } from '$app/stores';
	import { NavBarDetails } from '$lib/store/NavBar.store';
	import { onMount } from 'svelte';

	$NavBarDetails.leftContent = `Select ${$page.params.slug} city`;
	$NavBarDetails.type = 'SearchPage';

	onMount(() => {
		document.getElementById('modifyFlightModal').close();
	});
</script>

<SearchFlights type={$page.params.slug} />
