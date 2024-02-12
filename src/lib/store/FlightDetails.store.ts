import { writable } from "svelte/store";
import { getConfigData } from "./flights.api";
import type { FlightDetails } from "$lib/models/FlightDetails.model";

const flightDetailsStore = () => {
    const { subscribe, set, update } = writable<FlightDetails>();
    return {
        subscribe,
        set,
        update,
        fetchCongfig: async()=>{
            let data:FlightDetails;
            data = await getConfigData();
            set(data);
        }
    }
}

export const flightDetails = flightDetailsStore();
