<script lang="ts">
    import RightArrow from '../../images/RightArrow.svelte';
    import FrontArrow from '../../images/FrontArrow.svelte';

    export let data:any;
</script>


<div class="card bg-base-100 w-full cursor-pointer !rounded-md">
    <div class="flex justify-between p-2 max-w-[700px] min-w-[270px]">
        <div class="">
            <slot/>
        </div>
        <div class="mx-4 w-3/4">
            <!-- <div class="flex m-auto">
                Bangalore <FrontArrow /> Delhi
            </div>
            <div class="text-xs font-light">
                Sun, Dec-17 - Tue, Dec 19
            </div>
            <div class="text-xs font-bold">
                3 Travellers | Economy | 1hr 10m
            </div> -->
            <div class="flex m-auto">
                {data.title}
            </div>
            <div class="text-xs font-light">
                {data.subtitle}
            </div>
            <div class="text-xs font-bold">
                {data.thirdTitle}
            </div>
        </div>
        <div class="m-auto font-bold">
            <RightArrow/>
        </div>
    </div>
</div>