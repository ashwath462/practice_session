import { writable } from "svelte/store";

const flightResultsStore = () => {
    const { subscribe, set, update } = writable([]);
    return {
        subscribe,
        set,
        update
    }
}

export const flightResults = flightResultsStore();
