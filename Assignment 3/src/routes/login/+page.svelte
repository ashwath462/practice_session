<script lang="ts">
	import '../../app.css';
	import Navbar from '../../components/Navbar.svelte';
	import { goto } from '$app/navigation';
	import { database } from '../../utils/Constant';
	import { showPassword, isValidCredInput } from '../../utils/utils';
	let email = '',
		password = '',
		loading = false,
		error = "";

	const handleLogin = async() => {
		loading = true;
		try{
			email = email.toLowerCase();
			isValidCredInput(email,password);
			database.signInUser(email,password);
			(email = ''), (password = '');
			goto('/home')
		} catch(err:any){
			error = err.message;
			loading = false;
			return;
		}
		loading = false;
	};

</script>

<Navbar buttonType="Signup" />
<div class="flex flex-col items-center justify-center">
	<h1 class="text-2xl mt-4 font-bold">Login Page</h1>
	<label class="form-control my-5 w-full max-w-xs">
		<div class="label">
			<span class="label-text text-lg">Email :</span>
			<span class="label-text-alt text-red-400">*Required</span>
		</div>
		<input
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
			bind:value={email}
		/>
	</label>
	<label class="form-control mt-5 w-full max-w-xs">
		<div class="label">
			<span class="label-text text-lg">Password :</span>
			<span class="label-text-alt text-red-400">*Required</span>
		</div>
		<input
			id="userPassword"
			type="password"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
			bind:value={password}
		/>
		<div class="flex my-2 justify-between">
			<p>Show Password</p>
			<input class="checkbox" type="checkbox" on:click={() => showPassword()} />
		</div>
	</label>
	<button data-testid="login-button" disabled={loading} on:click={() => handleLogin()} class="btn btn-info btn-wide mt-10">Login</button>
	<div class="text-center text-red-500 ">{error}</div>
</div>
