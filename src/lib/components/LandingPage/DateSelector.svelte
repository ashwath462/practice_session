<script lang="ts">
	import AddSign from '$lib/images/AddSign.svelte';
	import dayjs from 'dayjs';
	import { addYears } from 'date-fns';
	import { Datepicker } from 'svelte-calendar';
	import { DATE_FORMAT, calendarStyles } from '$lib/utils/constants';
	import { onMount } from 'svelte';
	import { flightDetails } from '$lib/store/FlightDetails.store';
	const endDate = addYears(new Date(), 1);
	let store: any;

	$: $flightDetails.departDate = dayjs($store?.selected).format(DATE_FORMAT);

	onMount(() => {
		$flightDetails.departDate = dayjs($store?.selected).format(DATE_FORMAT);
	});
	// $: console.log($flightDetails.departDate);
</script>

<div class="card bg-base-100 px-2 m-4 rounded-sm">
	<div class="flex py-4 px-2">
		<div class="w-1/2 cursor-pointer">
			<div class="text-xs font-light">Departure</div>
			<Datepicker
				bind:store
				let:key
				let:send
				let:receive
				start={new Date()}
				end={endDate}
				theme={calendarStyles}
			>
				<button in:receive|local={{ key }} out:send|local={{ key }}>
					{dayjs($store?.selected).format('D MMM')}
				</button>
			</Datepicker>
			<div class="text-xs font-light">{dayjs($store?.selected).format('ddd')}</div>
		</div>
		<div class="w-1/2 border-l-2 pl-4 flex justify-between">
			<div>
				<div class="text-xs font-light">Return</div>
				<div>Add return</div>
				<div class="text-xs font-light">and save more!</div>
			</div>
			<div class="my-auto">
				<AddSign />
			</div>
		</div>
	</div>
</div>
