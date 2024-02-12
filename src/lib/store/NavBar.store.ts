import { writable } from "svelte/store";


let data:any;
const NavBarStore = () => {
    const { subscribe, set, update } = writable({
        type: "LandingPage",
        leftContent: "Flights",
        redirected:""
    });
    return {
        subscribe,
        set,
        update
    }
}

export const NavBarDetails = NavBarStore();
