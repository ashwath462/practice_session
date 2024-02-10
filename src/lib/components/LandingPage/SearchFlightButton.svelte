<script lang="ts">
	import { goto } from "$app/navigation";

    export let type:string;
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={()=>{goto('/ListingPage')}} class="mx-3 flex justify-center">
    <div class="btn btn-block btn-info text-white font-bold text-lg">
        {type}
    </div>
</div>