import { writable } from "svelte/store";
import { FlightDetails } from "$lib/models/FlightDetails.model";

export const flightDetails = writable(FlightDetails);
