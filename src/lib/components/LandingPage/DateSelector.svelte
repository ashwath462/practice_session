<script>
    import { getDate } from "$lib/utils/utils";
    const {day,date,month} = getDate();
</script>


<div class="card bg-base-100 shadow-xl px-2 m-4 cursor-pointer">
    <div class="flex py-4 px-2">
        <div class="w-1/2">
            <div>Departure</div>
            <div>{date} {month}</div>
            <div>{day}</div>
        </div>
        <div class="w-1/2 border-l-2 pl-4 flex justify-between">
            <div>
                <div>Return</div>
                <div>Add return</div>
                <div>and save more!</div>
            </div>
            <div class="my-auto">
                icon
            </div>
        </div>
    </div>
</div>