<script>
	import '../app.css';
    import Navbar from '../components/navbar.svelte';
    let checked = true;
</script>

<div class="bg-slate-300 h-[100vh]">
    <Navbar />
    <div class="mt-8 max-md:space-x-2 md:space-x-4 flex place-content-center">
        <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-[50%] max-md:btn-sm" />
        <button class="btn btn-secondary max-md:btn-sm">Add task</button>
        <button class="btn btn-error max-md:btn-sm">Remove All</button>
    </div>

    <div class="mt-8 w-full flex place-content-center">
            <div class="flex flex-col w-[50%] text-center">
                <p class="text-2xl text-teal-950 font-black">To Do</p>
                <div>
                    <input type="checkbox" checked={checked} class="checkbox" /> Task

                </div>
            </div>
            <div class="flex flex-col w-[50%] text-center">
                <p class="text-2xl text-blue-950 font-black ">Done</p>
                <span>hi how are you</span>
                <span>hi how are you</span>
                <span>hi how are you</span>
                <span>hi how are you</span>
                <span>hi how are you</span>
            </div>
    </div>
</div>