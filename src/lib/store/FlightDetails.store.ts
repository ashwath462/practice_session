import { writable } from "svelte/store";
import { getConfigData } from "./flights.api";


let data:any;
const flightDetailsStore = async() => {
    data = await getConfigData();
    console.log(data);
    const { subscribe, set, update } = writable(data);
    return {
        subscribe,
        set,
        update
    }
}

export const flightDetails = await flightDetailsStore();
