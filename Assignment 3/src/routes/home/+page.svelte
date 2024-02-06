<script lang="ts">
	import {onMount} from 'svelte';
	import '../../app.css';
	import Navbar from '../../components/Navbar.svelte';
	import TaskTable from '../../components/TaskTable.svelte';
	import {toDoList, doneList, user} from '../../lib/store/store';
	import { database } from '../../utils/utils';
	import { v4 as uuidv4 } from "uuid";
	import { goto } from '$app/navigation';
	
	let task = '',
	error = "",
	list:any = [], 
	otherList:any = [],
	loading = true,
	currentUser:any,
	currentUserId:any;

	$: onMount(async ()=>{
		currentUserId = localStorage.getItem('userId');
		user.subscribe((value:any)=>{
			currentUser = value;
		})

		toDoList.subscribe((value:any)=>{
			list = value;
		})

		doneList.subscribe((value:any)=>{
			otherList = value;
		})
		setTimeout(()=>{
			loading = false;
		},1000);
	})
	
	const addTask = (): any => {
		if (task.length >= 2 && task.length <= 250) {
			console.log(list);
			list = [...list, { id: uuidv4(), content: task, isComplete: false }];
			console.log(list);
			toDoList.set(list);
			database.updateUserTasks(currentUser,list,otherList);
			task = '';
		} else if (task.length <= 1) error = '*Note : Task length cannot be empty or 1';
		else error = '*Note : Task length cannot exceed 250 characters';
	};

    const removeAllTasks = ()=>{
		if(list.length>=1 || otherList.length>=1){
			const choice = confirm('Deleting all task from list, click OK to confirm.');
            if (choice) {
				list = [];
				otherList = [];
				toDoList.set([]);
                doneList.set([]);
				database.updateUserTasks(currentUser);
            }
        } else{
			error = '*Note : No task in to-do list! Kindly add a task first.';
        }
    }

    const enterUser = (event:any)=>{
        if(event.key == "Enter"){
			addTask();
        }
    }

	$: if(task.length>=2 && task.length<=250) error = "";
</script>

{#if ((currentUserId || currentUser?.uid))}
<div class="">
    <Navbar buttonType="Logout"/>
	<div class="mt-8 max-md:space-x-2 md:space-x-4 flex place-content-center max-md:flex-col">
		<input
			type="text"
			bind:value={task}
			class="input input-bordered input-primary w-[90%] md:max-w-[50%] max-md:btn-sm max-md:m-auto"
		/>
		<div class="flex place-content-between max-md:my-4 px-5">
			<button
				class="md:mx-4 btn btn-secondary max-md:btn-sm"
				on:click={() => {
					addTask();
				}}>Add task</button
			>
			<button
				class="md:mx-4 btn btn-error max-md:btn-sm"
				on:click={() => removeAllTasks()}>Remove All</button
			>
		</div>
	</div>
    <div class="text-center text-red-500 text-xl">{error}</div>
	<div class="grid grid-cols-2 max-sm:grid-cols-1">
		<TaskTable type="To-Do" />
		<TaskTable type="Done"/>
	</div>
</div>
{:else if (loading)}
<div class="text-center text-red-500 text-xl"> Loading! </div>
{currentUserId}
{:else}
	<div class="text-center text-red-500 text-xl"> Invalid credentials! </div>
	<div class="text-center text-red-500 text-xl">Go back to <button class=" btn-ghost text-teal-400" on:click={()=>{setTimeout(() => goto('/login'), 0);}}>Login page</button>.</div> 
{/if}
<svelte:window on:keydown={enterUser}/>