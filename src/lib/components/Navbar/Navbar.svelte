<script lang="ts">
	import Menu from "./Menu.svelte";
    import ModifyModal from "../Listing Page/ModifyModal.svelte";
    import BackArrow from '../../images/BackArrow.svelte';
    import Coupon from "$lib/images/Coupon.svelte";
	import Wallet from "$lib/images/Wallet.svelte";
	import ModifySearch from "$lib/images/ModifySearch.svelte";
	import { goto } from "$app/navigation";
	import FrontArrow from "$lib/images/FrontArrow.svelte";
    import { NavBarDetails } from "$lib/store/NavBar.store";
    import { flightDetails } from "$lib/store/FlightDetails.store";
	import { travellClassValue } from "$lib/store/TravellClass.store";
    // @ts-ignore
    const showModal = ()=>document.getElementById('modifyFlightModal').showModal()
    $: navbarData = $NavBarDetails;
</script>



<ModifyModal/>
<div class="navbar justify-between bg-sky-500 text-white font-bold">
    <div class="text-xl">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p class="p-2" on:click={()=>{goto('/FlightsPage')}}>
            <BackArrow/>
        </p> 
        {#if (navbarData.type != "ListingPage")}
            <div>
                {navbarData.leftContent}
            </div>
        {:else if ((navbarData.type === "ListingPage"))}
            <div class="flex flex-col p-1">
                <div class="flex">
                    <div>{$flightDetails.src.city}</div>
                    <div class="p-1"><FrontArrow color="white"/></div>
                    <div>{$flightDetails.des.city}</div>
                </div>
                <div class="text-sm flex">
                    <div>{$flightDetails.departDate}</div>
                    <div class="mx-1">|</div>
                    <div>{$flightDetails.adultCount + $flightDetails.childCount + $flightDetails.infantCount} Traveller</div>
                    <div class="mx-1">|</div>
                    <div>{$travellClassValue.value.split(' ')[0]}</div>
                </div>
            </div>
        {/if}
    </div>
    <div class="space-x-4">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#if navbarData.type === "LandingPage"}
            <div class="" ><Wallet/></div>
            <div><Coupon /></div>
            <Menu/>
        {:else if (navbarData.type === "SearchPage")}
            <div></div>
        {:else}
        <div class="" on:click={()=>showModal()}><ModifySearch/></div>
        {/if}
    </div>
</div>