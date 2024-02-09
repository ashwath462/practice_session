<script lang="ts">
	import AddSign from '$lib/images/AddSign.svelte';
    import dayjs from 'dayjs';
    import { addYears } from 'date-fns';
	import { getDate } from '$lib/utils/utils';
    import { Datepicker } from 'svelte-calendar';
	const { day, date, month } = getDate();
    const endDate = addYears(new Date(), 1);
    let store:any;
    const calendarStyles = {
        "calendar": {
            "width": "700px",
            "maxWidth": "90vw",
            "legend": {
            "height": "45px"
            },
            "shadow": "0px 10px 26px rgba(0, 0, 0, 0.25)",
            "colors": {
            "text": {
                "primary": "#333",
                "highlight": "#fff"
            },
            "background": {
                "primary": "#fff",
                "highlight": "#00b5ff",
                "hover": "#eee"
            },
            "border": "#eee"
            },
            "font": {
            "regular": "1.5em",
            "large": "37em"
            },
            "grid": {
            "disabledOpacity": ".35",
            "outsiderOpacity": ".6"
            }
        }
    }
</script>

<div class="card bg-base-100 px-2 m-4 rounded-sm">
	<div class="flex py-4 px-2">
		<div class="w-1/2 cursor-pointer">
			<div class="text-xs font-light">Departure</div>
            <Datepicker bind:store let:key let:send let:receive start={new Date()} end={endDate} theme={calendarStyles}>
                <button  in:receive|local={{ key }} out:send|local={{ key }}>
                        {dayjs($store?.selected).format('D MMM')}
                </button>
            </Datepicker>
			<div class="text-xs font-light">{dayjs($store?.selected).format('ddd')}</div>
		</div>
		<div class="w-1/2 border-l-2 pl-4 flex justify-between">
			<div>
				<div class="text-xs font-light">Return</div>
				<div>Add return</div>
				<div class="text-xs font-light">and save more!</div>
			</div>
			<div class="my-auto">
				<AddSign />
			</div>
		</div>
	</div>
</div>
