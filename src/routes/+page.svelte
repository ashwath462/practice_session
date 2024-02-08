<script lang="ts">
    import { goto } from "$app/navigation";
    import {onMount} from 'svelte';
    import Loader from "$lib/components/Common/Loader.svelte";
    onMount(()=>{
        goto('FlightsPage');
    })
</script>

<Loader/>