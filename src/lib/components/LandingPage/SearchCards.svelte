<script>
    import TravelDetailCard from "./TravelDetailCard.svelte";
    export let title = "Recent Searches";
</script>


<div class="flex flex-col p-4 w-full">
    <div>{title}</div>

    <div class="carousel rounded-box space-x-6">
        <div class="carousel-item w-5/6 max-w-[700px] min-w-[270px] ">
            <TravelDetailCard/>
        </div>
        <div class="carousel-item w-5/6 max-w-[700px] min-w-[270px] ">
            <TravelDetailCard/>
        </div>
        <div class="carousel-item w-5/6 max-w-[700px] min-w-[270px] ">
            <TravelDetailCard/>
        </div>
        <div class="carousel-item w-5/6 max-w-[700px] min-w-[270px] ">
            <TravelDetailCard/>
        </div>
    </div>
</div>