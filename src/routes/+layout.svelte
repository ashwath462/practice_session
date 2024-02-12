<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar/Navbar.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";
	import { onMount } from "svelte";
	import { flightDetails } from "$lib/store/FlightDetails.store";
	import Loader from '$lib/components/common/Loader.svelte'

	let loading = true;
	onMount(async()=>{
		await flightDetails.fetchCongfig();
		loading = false;
	})
</script>

{#if loading}
	<div class="flex h-screen justify-center items-center">
		<Loader/>

	</div>
{:else}
	<div class="bg-slate-200 min-h-[100vh]">
		<Navbar/>
		<div class="pb-12">
			<slot />
		</div>
		<Footer/>
	</div>
{/if}
<style>
	:global(html) {
		font-size: 10px;
	}
	@media (min-width: 281px) {
		:global(html) {
			font-size: 12px;
		}
	}
	@media (min-width: 375px) {
		:global(html) {
			font-size: 14px;
		}
	}
</style>