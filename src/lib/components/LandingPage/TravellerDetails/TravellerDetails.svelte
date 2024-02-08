<script lang="ts">
    import DownArrow from "$lib/images/DownArrow.svelte";
import TravellerModal from "./TravellerModal.svelte";

    // @ts-ignore
    const showModal = ()=>document.getElementById('travelModal').showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card bg-base-100 py-4 px-2 m-4 cursor-pointer rounded-sm" on:click={()=>{showModal()}} >
    <div class="flex">
        <div class="w-1/2">
            <div class="text-xs font-light">Class</div>
            <div class="flex">
                <div>Economy</div>
                <div class="mx-8"><DownArrow/></div>
            </div>
        </div>
        <div class="w-1/2 border-l-2 pl-4 ">
            <div class="text-xs font-light">Traveller</div>
            <div class="flex">
                <div>1</div>
                <div class="mx-8"><DownArrow/></div>
            </div>
        </div>
    </div>
    <TravellerModal/>
</div>