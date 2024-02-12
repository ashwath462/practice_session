<script>
	import { onMount } from "svelte";

    export let error = "";

    onMount(()=>{
        setTimeout(()=>{
            error = "";
        }, 4000);
    })
</script>

<div class="toast toast-center">
    <div class="alert rounded-full opacity-75">
    <span>{error}</span>
    </div>
</div>