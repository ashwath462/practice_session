<script lang="ts">
  import { onMount } from "svelte";
  import "../../app.css";
  import Navbar from "../../components/Navbar.svelte";
  import TaskTable from "../../components/TaskTable.svelte";
  import { toDoList, doneList, user } from "../../lib/store/store";
  import { getUserFromLocalStorage } from "../../utils/utils";
  import { database, type taskType, type User } from "../../utils/Constant";
  import { v4 as uuidv4 } from "uuid";
  import { goto } from "$app/navigation";
  import { ListTypes } from "../../utils/Constant";
  import Button from "../../components/Common/Button.svelte";
  import TaskInput from "../../components/Common/TaskInput.svelte";
  import Error from "../../components/Common/Error.svelte";

  let task = "",
    error = "",
    toDoTask: taskType[] = [],
    completedTask: taskType[] = [],
    loading = true,
    currentUser: User,
    currentUserId: string | null;

  onMount(async () => {
    currentUserId = getUserFromLocalStorage();
    user.subscribe((value: any) => {
      currentUser = value;
    });

    toDoList.subscribe((value: any) => {
      toDoTask = value;
    });

    doneList.subscribe((value: any) => {
      completedTask = value;
    });
    setTimeout(() => {
      loading = false;
    }, 1000);
  });

  const addTask = (): any => {
    if (task.length >= 2 && task.length <= 250) {
      console.log(toDoTask);
      toDoTask = [
        ...toDoTask,
        { id: uuidv4(), content: task, isComplete: false },
      ];
      console.log(toDoTask);
      toDoList.set(toDoTask);
      database.updateUserTasks(currentUser, toDoTask, completedTask);
      task = "";
    } else if (task.length <= 1)
      error = "*Note : Task length cannot be empty or 1";
    else error = "*Note : Task length cannot exceed 250 characters";
  };

  const removeAllTasks = () => {
    if (toDoTask.length >= 1 || completedTask.length >= 1) {
      const choice = confirm(
        "Deleting all task from toDoTask, click OK to confirm."
      );
      if (choice) {
        toDoTask = [];
        completedTask = [];
        toDoList.set([]);
        doneList.set([]);
        database.updateUserTasks(currentUser);
      }
    } else {
      error = "*Note : No task in to-do toDoTask! Kindly add a task first.";
    }
  };

  const enterUser = (event: any) => {
    if (event.key == "Enter") {
      addTask();
    }
  };

  $: if (task.length >= 2 && task.length <= 250) error = "";
</script>

{#if currentUserId || currentUser?.uid}
  <div class="">
    <Navbar buttonType="Logout" />
    <div
      class="mt-8 max-md:space-x-2 md:space-x-4 flex place-content-center max-md:flex-col"
    >
      <TaskInput bind:task />
      <div class="flex place-content-between max-md:my-4 px-5">
        <Button action={addTask} type={"btn-secondary"} content={"Add task"} />
        <Button
          action={removeAllTasks}
          type={"btn-error"}
          content={"Remove All"}
        />
      </div>
    </div>
    <Error message={error}/>
    <div class="grid grid-cols-2 max-sm:grid-cols-1">
      <TaskTable type={ListTypes.ToDo} />
      <TaskTable type={ListTypes.Completed} />
    </div>
  </div>
{:else if loading}
  <div class="text-center text-red-500 text-xl">Loading!</div>
  {currentUserId}
{:else}
  {goto("/login")}
{/if}
<svelte:window on:keydown={enterUser} />
