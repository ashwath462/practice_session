<script lang="ts">
    import type { stylesType, taskType } from "../utils/Constant";
    import DeleteButton from "../core-commons/icons/delete-button.svelte";
    export let styles:stylesType;
    export let task:taskType;
    export let handleCheck:Function;
    export let deleteTask:Function;
</script>

<div
    class="flex w-[100%] text-center p-4 {styles.color} border-solid rounded-md justify-between mt-4"
>
    <input
        type="checkbox"
        checked={task?.isComplete}
        on:click={() => {
            handleCheck(task?.id);
        }}
        class="checkbox {styles.checkboxBg} checkbox-xl"
    />
    <div class="w-[80%] break-words">{task?.content}</div>
    <button on:click={() => deleteTask(task?.id)}><DeleteButton/></button>
</div>