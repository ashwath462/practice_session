<script lang="ts">
	import MenuDots from '$lib/images/MenuDots.svelte';
</script>

<div class="cursor-pointer dropdown dropdown-bottom dropdown-end">
	<div tabindex="0" role="button"><MenuDots /></div>
	<ul class="dropdown-content !top-[50%] z-[1] shadow rounded bg-base-100 text-black w-52">
		<div class="font-light border-b p-2">My Bookings</div>
		<div class="font-light border-b p-2">My Transactions</div>
		<div class="font-light border-b p-2">Web Check-In</div>
		<div class="font-light border-b p-2">Help</div>
		<div class="font-light border-b p-2">Partner Home</div>
		<div class="font-light p-2">Sdk Logout</div>
	</ul>
</div>
