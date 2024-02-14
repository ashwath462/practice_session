<script lang="ts">
	import type { CityDetails } from '$lib/models/CityDetails.model';
	import { goto } from '$app/navigation';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let cityData: CityDetails[] = [];
	export let type: 'source' | 'destination';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 100),
		fallback(node, params) {
			const style = getComputedStyle(node);
			return {
				duration: 250,
				easing: params.easing,
				css: (t) => {
					if (type === 'source') {
						return `
                            opacity: ${t};
                            transform: translateY(${(1 - t) * 0.13 * parseFloat(style.height)}px);
                        `;
					} else {
						return `
                            opacity: ${t};
                            transform: translateY(${(t - 1) * 0.13 * parseFloat(style.height)}px);
                        `;
					}
				}
			};
		}
	});
</script>

{#each cityData as item (item)}
	<div
		on:click={() => {
			goto(`SearchPage/${type}`);
		}}
		class="flex my-auto py-2"
		role="button"
		tabindex="0"
		on:keydown={() => {}}
		animate:flip={{ duration: 200 }}
		in:receive={{ key: item.city }}
		out:send={{ key: item.city }}
	>
		<div class="border text-xs my-auto px-2">{item.iataCode}</div>
		<div class="mx-2 font-bold">{item.city}</div>
	</div>
{/each}
