<script lang="ts">
    import DateSelector from "../LandingPage/DateSelector.svelte";
    import TravellerDetails from "../LandingPage/TravellerDetails/TravellerDetails.svelte";
    import SearchFlightButton from "../LandingPage/SearchFlightButton.svelte";
	import SourceDestinationSelector from "../LandingPage/SourceDestinationSelector.svelte";
	import Close from "$lib/images/Close.svelte";
	import ModalBoundary from "$lib/images/ModalBoundary.svelte";

    // @ts-ignore
    const closeModal = ()=>document.getElementById('modifyFlightModal').close();
</script>


<dialog id="modifyFlightModal" class="modal modal-top">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="w-full bg-gray-100 py-5 flex flex-col">
        <div class="flex justify-between p-4">
            <div class="font-bold">Modify Flight</div>
            <button on:click={()=>closeModal()}> <Close/> </button>
        </div>
        <SourceDestinationSelector/>
        <DateSelector/>
        <TravellerDetails/>
        <div class="form-control">
            <div class="flex p-2">
                <input type="checkbox" class="checkbox checkbox-sm mx-2" />
                <span class="label-text cursor-pointer"> Show only non-stop flights</span> 
            </div>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={()=>closeModal()}>
            <SearchFlightButton type="Search Flight"/>
        </div>
        <div class="mx-auto mt-4">
            <ModalBoundary/>
        </div>
    </div>
</dialog>