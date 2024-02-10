import { writable } from "svelte/store";


let data:any;
const NavBarStore = async() => {
    const { subscribe, set, update } = writable({
        type: "LandingPage",
        leftContent: "Flights"
    });
    return {
        subscribe,
        set,
        update
    }
}

export const NavBarDetails = await NavBarStore();
