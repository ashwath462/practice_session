import { writable } from "svelte/store";

const travellClassStore = async() => {
    const data = {key:"", value:""};
    const { subscribe, set, update } = writable(data);
    return {
        subscribe,
        set,
        update
    }
}

export const travellClassValue = await travellClassStore();
