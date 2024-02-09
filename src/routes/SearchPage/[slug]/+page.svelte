<script lang="ts">
    import SearchFlights from "$lib/components/SearchCity/SearchCity.svelte";
    import { page } from '$app/stores';
</script>



<SearchFlights type={$page.params.slug}/>