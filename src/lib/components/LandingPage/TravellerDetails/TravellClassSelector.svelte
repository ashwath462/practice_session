<script lang="ts">
	export let data: { key: string; value: string };
	export let travellClassValue: { key: string; value: string };
</script>

<div class="flex p-1">
	<div class="m-2">
		<input
			type="radio"
			class="radio radio-sm radio-primary"
			bind:group={travellClassValue}
			value={data}
		/>
	</div>
	<div class="my-1">{data.value}</div>
</div>
