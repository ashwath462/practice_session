<script>
	import { cardType } from "$lib/utils/constants";
    import Border from "../common/Border.svelte";
    import SearchCards from "./SearchCards.svelte";
</script>



<div class="font-bold p-4">
    Popular cities
</div>

<Border/>
<div class="mx-4 border-b-2">
    <SearchCards type={cardType.upcomingFlight}/>
</div>