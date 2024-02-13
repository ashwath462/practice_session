<script lang="ts">
	import { flightDetails } from "$lib/store/FlightDetails.store";
    import { validateTravellers } from "$lib/utils/utils";
    import type {GuestType} from "$lib/models/GuestDetails.model";
    export let guestData:GuestType;
    export let count:number;
    export let totalGuest:number;
    export let error:string;

    const increaseCount = ()=>{
        const validate = validateTravellers(count, guestData.minValue, guestData.maxValue, totalGuest)
        if(validate){
            error = "";
            if(guestData.guestType === 'INFANT'){
                if(count< $flightDetails.adultCount) count=count+1;
                else error = guestData.errorMessage;
            }
            else{
                count=count+1;
            }
        }
        else{
            if(totalGuest == 9) error = "Total guest cannot be more than 9";
            else error = `${guestData.textName} can not be more than ${guestData.maxValue}`
        }
    }   

    const decreaseCount = ()=>{
        const validate = validateTravellers(count, guestData.minValue, guestData.maxValue, totalGuest, false)
        console.log(validate,count);
        if(validate){
            error = "";
            count=count-1;
        }
        else{
            error = `${guestData.textName} can not be less than ${guestData.minValue}`
        }
        console.log(count)
    }  
</script>
<div class="flex justify-between px-4 py-3">
    <div>
        <div class="font-bold">{guestData.textName}</div>
        <div class="text-xs font-light">{guestData.subTextName}</div>
    </div>
    <div class="flex border">
        <button
            class="bg-white p-1 font-bold"
            on:click={()=>{decreaseCount()}}>-</button
        >
        <p class="bg-white p-2 font-bold">{count}</p>
        <button
            class="bg-white p-1 font-bold"
            on:click={()=>{increaseCount()}}>+</button
        >
    </div>
</div>