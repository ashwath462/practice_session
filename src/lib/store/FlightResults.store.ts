import { writable } from "svelte/store";

const flightResultsStore = async() => {
    const { subscribe, set, update } = writable([]);
    return {
        subscribe,
        set,
        update
    }
}

export const flightResults = await flightResultsStore();
