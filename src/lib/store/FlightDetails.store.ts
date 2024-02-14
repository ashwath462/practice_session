import { writable } from "svelte/store";
import { getConfigData } from "./flights.api";
import type { FlightDetailsModel } from "$lib/models/FlightDetails.model";

const flightDetailsStore = () => {
    const { subscribe, set, update } = writable<FlightDetailsModel>();
    return {
        subscribe,
        set,
        update,
        fetchCongfig: async()=>{
            let data:FlightDetailsModel;
            data = await getConfigData();
            set(data);
        }
    }
}

export const flightDetails = flightDetailsStore();
