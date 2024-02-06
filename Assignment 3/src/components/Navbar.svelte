<script lang="ts">
	import "../app.css";
	import { goto } from '$app/navigation';
    import {auth} from '$lib/firebase/firebase'
	import { user } from '$lib/store/store';
	export let buttonType = '';

	const handleClick = ()=>{
		if(buttonType === 'Logout'){
			auth().signOut().then(()=>{
				user.set({uid:'',email:''});
				localStorage.removeItem("userId");
			})
			goto('/login');
		} else if(buttonType === 'Login'){
			goto('/login');
		} else{
			goto('/');
		}
	}
</script>


<div data-testid="navbar" class="flex p-[0.5rem] min-h-[4rem] w-full  bg-neutral text-white justify-between">
	<p class="btn btn-ghost text-3xl" >To Do List</p>
	<button data-testid="login-signup-button" on:click={()=>handleClick()} class="btn btn-primary text-[1.1rem]">{buttonType}</button>
</div>
