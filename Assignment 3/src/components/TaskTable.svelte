<script lang="ts">
	import "../app.css";
	import {onMount} from 'svelte';
	export let type: 'To-Do' | 'Done';
	import {toDoList, doneList, user} from '$lib/store/store';
	import { database } from "../utils/utils";
  	import DeleteButton from "./delete-button.svelte";

	let tasks:any = [], otherTasks:any = [], currentUser:any, currentUserId:any;
	let obj = {
		checkboxBg: '',
		color: ''
	};

	

	onMount(async()=>{
		currentUserId = localStorage.getItem('userId');
		if(currentUserId){
			const userData:any = await database.getUserTasks(currentUserId);
			console.log({userData});
			toDoList.set(userData?.toDoList);
			doneList.set(userData?.doneList);
			user.set({uid: currentUserId, email: userData?.email});
		}
		await user.subscribe((value:any)=>{
			currentUser = value;
		});
		if (type == 'To-Do') {
			obj.checkboxBg = 'bg-neutral-200';
			obj.color = 'bg-gray-400';
			toDoList.subscribe((value:any)=>{
				tasks = value;
			})
			doneList.subscribe((value:any)=>{
				otherTasks = value;
			})
		} else if (type == 'Done') {
			obj.checkboxBg = 'checked-success';
			obj.color = 'bg-teal-400';
			doneList.subscribe((value:any)=>{
				tasks = value;
			})
			toDoList.subscribe((value:any)=>{
				otherTasks = value;
			})

		} else throw new Error('Kindly check type');
	})

	const deleteTask = (id: number) => {
		tasks = tasks.filter((task: any) => task.id != id);
		console.log(tasks,otherTasks);
		(type === "To-Do")?(
			toDoList.set(tasks),
			doneList.set(otherTasks)
		):(
			toDoList.set(otherTasks),
			doneList.set(tasks)
		)
		database.updateUserTasks(currentUser, tasks, otherTasks,type);
	};

	const handleCheck = (id: number) => {
		console.log(id);
		const task = tasks.find((obj: any) => obj.id === id);
		task.isComplete = !task.isComplete;
		otherTasks = [...otherTasks, task];
		deleteTask(id);
	};
</script>

<div data-testid={type} class="mt-12 max-md: mt-6">
	<p class="text-2xl text-blue-950 font-black text-center">{type}</p>
	<div class="flex flex-col my-8 place-content-evenly m-4">
		{#each tasks as task (task.id)}
			<div
				class="flex w-[100%] text-center p-4 {obj.color} border-solid rounded-md justify-between mt-4"
			>
				<input
					type="checkbox"
					checked={task.isComplete}
					on:click={() => {
						handleCheck(task.id);
					}}
					class="checkbox {obj.checkboxBg} checkbox-xl"
				/>
				<div class="w-[35vw]">{task.content}</div>
				<button on:click={() => deleteTask(task.id)}><DeleteButton/></button>
			</div>
		{/each}
	</div>
</div>
