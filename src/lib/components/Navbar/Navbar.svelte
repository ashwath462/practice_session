<script>
	import Menu from "./Menu.svelte";
    import ModifyModal from "../Listing Page/ModifyModal.svelte";
    import BackArrow from '../../images/BackArrow.svelte';
    import Coupon from "$lib/images/Coupon.svelte";
	import Wallet from "$lib/images/Wallet.svelte";
	import { goto } from "$app/navigation";
    // @ts-ignore
    const showModal = ()=>document.getElementById('modifyFlightModal').showModal()
</script>



<ModifyModal/>
<div class="navbar justify-between bg-sky-500 text-white font-bold">
    <div class="text-xl">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p class="p-2" on:click={()=>{goto('/FlightsPage')}}>
            <BackArrow/>
        </p> 
        Flights
    </div>
    <div class="space-x-4">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="" on:click={()=>showModal()}><Wallet/></div>
        <div><Coupon /></div>
        <Menu/>
    </div>
</div>