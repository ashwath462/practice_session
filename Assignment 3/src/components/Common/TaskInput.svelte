<script lang="ts">
  import type { taskType } from "../../utils/Constant";
  export let task: string;
</script>

<input
  type="text"
  bind:value={task}
  class="input input-bordered input-primary w-[90%] md:max-w-[50%] max-md:btn-sm max-md:m-auto"
/>
