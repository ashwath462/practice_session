<script lang="ts">
	import "../app.css";
	import {onMount} from 'svelte';
	export let type: ListTypes;
	import {toDoList, doneList, user} from '$lib/store/store';
	import { getUserFromLocalStorage } from "../utils/utils";
  	import { ListTypes, type taskType } from "../utils/Constant";
	import { database } from '../utils/Constant';
  import TaskTile from "./TaskTile.svelte";

	let tasks:taskType[] = [], completedTask:taskType[] = [], currentUser:string, currentUserId:string|null;
	let styles = {
		checkboxBg: '',
		color: ''
	};

	

	onMount(async()=>{
		currentUserId = await getUserFromLocalStorage();
		if(currentUserId){
			const userData:any = await database.getUserTasks(currentUserId);
			console.log({userData});
			toDoList.set(userData?.toDoList);
			doneList.set(userData?.doneList);
			user.set({uid: currentUserId, email: userData?.email});
		}
		user.subscribe((value:any)=>{
			currentUser = value;
		});
		if (type == ListTypes.ToDo) {
			styles.checkboxBg = 'bg-neutral-200';
			styles.color = 'bg-gray-400';
			toDoList.subscribe((value:any)=>{
				tasks = value;
			})
			doneList.subscribe((value:any)=>{
				completedTask = value;
			})
		} else if (type == ListTypes.Completed) {
			styles.checkboxBg = 'checked-success';
			styles.color = 'bg-teal-400';
			doneList.subscribe((value:any)=>{
				tasks = value;
			})
			toDoList.subscribe((value:any)=>{
				completedTask = value;
			})

		} else throw new Error('Kindly check type');
	})

	const deleteTask = (id: number) => {
		tasks = tasks.filter((task: any) => task.id != id);
		console.log(tasks,completedTask);
		(type == ListTypes.ToDo)?(
			toDoList.set(tasks),
			doneList.set(completedTask)
		):(
			toDoList.set(completedTask),
			doneList.set(tasks)
		)
		database.updateUserTasks(currentUser, tasks, completedTask,type);
	};

	const handleCheck = (id: number) => {
		console.log(id);
		const task = tasks.find((task: any) => task.id === id);
		if(task?.isComplete != undefined) task.isComplete = !task?.isComplete;
		completedTask = [...completedTask, task];
		deleteTask(id);
	};
</script>

<div data-testid={type} class="mt-12 max-md: mt-6">
	<p class="text-2xl text-blue-950 font-black text-center">{type}</p>
	<div class="flex flex-col my-8 place-content-evenly m-4">
		{#each tasks as task (task?.id)}
			<TaskTile styles={styles} task={task} handleCheck={handleCheck} deleteTask={deleteTask}/>
		{/each}
	</div>
</div>
