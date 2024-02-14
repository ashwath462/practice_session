<script>
	// @ts-nocheck
	import Swap from '$lib/images/Swap.svelte';
	import Circle from '$lib/images/DestSrcImg/Circle.svelte';
	import Line from '$lib/images/DestSrcImg/Line.svelte';
	import Plane from '$lib/images/DestSrcImg/Plane.svelte';
	import { flightDetails } from '$lib/store/FlightDetails.store';
	import { tweened } from 'svelte/motion';
	import CityCard from './CityCard.svelte';
	import Divider from '../common/Divider.svelte';

	let isSwapped = false;

	let rotation = tweened(0);

	function handleClick() {
		rotation.set($rotation - 180);
	}
	// console.log($flightDetails)

	const swapCityData = () => {
		handleClick();
		isSwapped = !isSwapped;
		let swappableData = $flightDetails.src;
		$flightDetails.src = $flightDetails.des;
		$flightDetails.des = swappableData;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card bg-base-100 m-4 rounded-sm">
	<div class="flex p-2 justify-between">
		<div class="m-auto flex flex-col items-center">
			<Circle />
			<Line />
			<Plane />
		</div>
		<div class="w-11/12 flex flex-col cursor-pointer">
			<CityCard cityData={[$flightDetails.src]} type="source" />
			<Divider />
			<CityCard cityData={[$flightDetails.des]} type="destination" />
		</div>
		<div
			class="my-auto mx-4 cursor-pointer icon"
			style="transform: rotate({$rotation}deg);"
			on:click={() => swapCityData()}
		>
			<Swap />
		</div>
	</div>
</div>

<style>
	.icon {
		transition: transform 0.1s ease-out;
	}
</style>
