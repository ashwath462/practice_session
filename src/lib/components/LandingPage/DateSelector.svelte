<script>
    import { getDate } from "$lib/utils/utils";
    const {day,date,month} = getDate();
</script>


<div class="card bg-base-100 px-2 m-4 cursor-pointer rounded-sm">
    <div class="flex py-4 px-2">
        <div class="w-1/2">
            <div class="text-xs font-light">Departure</div>
            <div class="">{date} {month}</div>
            <div class="text-xs font-light">{day}</div>
        </div>
        <div class="w-1/2 border-l-2 pl-4 flex justify-between">
            <div>
                <div class="text-xs font-light">Return</div>
                <div>Add return</div>
                <div class="text-xs font-light">and save more!</div>
            </div>
            <div class="my-auto">
                icon
            </div>
        </div>
    </div>
</div>