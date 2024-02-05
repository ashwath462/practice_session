<script>
    import DateSelector from "$lib/components/LandingPage/DateSelector.svelte";
	import TravellerDetails from "$lib/components/LandingPage/TravellerDetails.svelte";
    import SearchFlightButton from "$lib/components/LandingPage/SearchFlightButton.svelte";
</script>


<DateSelector/>
<TravellerDetails/>
<div class="form-control">
    <div class="flex p-2">
      <input type="checkbox" class="checkbox checkbox-sm mx-2" />
      <span class="label-text cursor-pointer"> Show only non-stop flights</span> 
    </div>
  </div>
<SearchFlightButton/>