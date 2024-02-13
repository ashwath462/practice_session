<script lang="ts">
    export let action:Function;
    export let type:string;
    export let content:string;
</script>



<button
  class="md:mx-4 btn {type} max-md:btn-sm"
  on:click={() => {
    action();
  }}>{content}</button
>
