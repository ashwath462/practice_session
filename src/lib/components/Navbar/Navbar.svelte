<script>
	import Menu from "./Menu.svelte";
    import ModifyModal from "../FlightSearchResult/ModifyModal.svelte";

    // @ts-ignore
    const showModal = ()=>document.getElementById('modifyFlightModal').showModal()
</script>



<ModifyModal/>
<div class="navbar justify-between bg-sky-500 text-white font-bold">
    <div class="text-xl">Flights</div>
    <div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="" on:click={()=>showModal()}>wallet</div>
        <div>coupon</div>
        <Menu/>
    </div>
</div>