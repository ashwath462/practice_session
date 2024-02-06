import { writable, readable, type Writable } from "svelte/store";

export let toDoList: any = writable([]);
export let doneList: any = writable([]);



function createUserStore() {
	const { subscribe, set, update }: Writable<any> = writable(null);
	return {
		subscribe,
		set,
		update
	};
}
export let user = createUserStore();
