<script>
	import SearchFlightButton from '../SearchFlightButton.svelte';
	let adultTravellers = 1,
		childrenTravellers = 0,
		infantTravellers = 0;
</script>

<dialog id="travelModal" class="modal modal-bottom">
	<div class="modal-box p-0 m-0">
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="flex flex-col mb-3">
			<div class="text-xl font-bold px-4">Select Traveller(s)</div>
			<div class="flex justify-between px-4 py-3">
				<div>
					<div class="font-bold">Adults</div>
					<div class="text-xs font-light">12 years and above</div>
				</div>
				<div class="flex border">
					<button
						class="bg-white p-1 font-bold"
						on:click={() => {
							adultTravellers > 1 ? (adultTravellers -= 1) : adultTravellers;
						}}>-</button
					>
					<p class="bg-white p-2 font-bold">{adultTravellers}</p>
					<button
						class="bg-white p-1 font-bold"
						on:click={() => {
							adultTravellers += 1;
						}}>+</button
					>
				</div>
			</div>
			<div class="flex justify-between px-4 py-3">
				<div>
					<div class="font-bold">Children</div>
					<div class="text-xs font-light">2 to 12 years</div>
				</div>
				<div class="flex border">
					<button
						class="bg-white p-1 font-bold"
						on:click={() => {
							childrenTravellers > 0 ? (childrenTravellers -= 1) : childrenTravellers;
						}}>-</button
					>
					<p class="bg-white p-2 font-bold">{childrenTravellers}</p>
					<button
						class="bg-white p-1 font-bold"
						on:click={() => {
							childrenTravellers += 1;
						}}>+</button
					>
				</div>
			</div>
			<div class="flex justify-between px-4 py-3">
				<div>
					<div class="font-bold">Infants</div>
					<div class="text-xs font-light">Less than 2 years</div>
				</div>
				<div class="flex border">
					<button
						class="bg-white p-1 font-bold"
						on:click={() => {
							infantTravellers > 0 ? (infantTravellers -= 1) : infantTravellers;
						}}>-</button
					>
					<p class="bg-white p-2 font-bold">{infantTravellers}</p>
					<button
						class="bg-white p-1 font-bold"
						on:click={() => {
							infantTravellers += 1;
						}}>+</button
					>
				</div>
			</div>
			<div class="flex flex-col px-4 py-3">
				<div class="text-xl font-bold">Select Class</div>
				<div class="flex p-1">
					<div class="m-2">
						<input
							type="radio"
							name="radio-3"
							class="radio radio-sm radio-primary"
							value="Economy"
                            checked
						/>
					</div>
					<div class="my-1">Economy Class</div>
				</div>
				<div class="flex p-1">
					<div class="m-2">
						<input
							type="radio"
							name="radio-3"
							class="radio radio-sm radio-primary"
							value="Premium Economy"
						/>
					</div>
					<div class="my-1">Premium Economy Class</div>
				</div>
				<div class="flex p-1">
					<div class="m-2">
						<input
							type="radio"
							name="radio-3"
							class="radio radio-sm radio-primary"
							value="Business"
						/>
					</div>
					<div class="my-1">Business Class</div>
				</div>
				<div class="flex p-1">
					<div class="m-2">
						<input type="radio" name="radio-3" class="radio radio-sm radio-primary" value="First" />
					</div>
					<div class="my-1">First Class</div>
				</div>
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
