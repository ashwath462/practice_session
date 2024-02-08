<script>
	import { goto } from "$app/navigation";
    import Swap from "$lib/images/Swap.svelte";
    import Circle from "$lib/images/DestSrcImg/Circle.svelte";
    import Line from "$lib/images/DestSrcImg/Line.svelte";
    import Plane from "$lib/images/DestSrcImg/Plane.svelte";

</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card bg-base-100  m-4 rounded-sm">
    <div class="flex p-2 justify-between">
        <div class="m-auto flex flex-col items-center">
            <Circle/>
            <Line/>
            <Plane/>
        </div>
        <div class="w-11/12 flex flex-col cursor-pointer">
            <div on:click={()=>{goto('SearchPage')}} class="flex my-auto py-2 border-b-2 border-dashed border-gray-400">
                <div class="border text-xs my-auto px-2 ">BLR</div>
                <div class="mx-2 font-bold">Banglore</div>
            </div>
            <div on:click={()=>{goto('SearchPage')}} class="flex my-auto py-2">
                <div class="border text-xs my-auto px-2">HYD</div>
                <div class="mx-2 font-bold">Hydrabad</div>
            </div>
        </div>
        <div class="my-auto mx-4 cursor-pointer">
            <Swap/>
        </div>
    </div>
</div>