<script lang="ts">
  import "../../app.css";
  import { onMount } from "svelte";
  import Navbar from "../../components/Navbar.svelte";
  import { goto } from "$app/navigation";
  import { deleteUserFromLocalStorage, getUserFromLocalStorage } from "../../utils/utils";
  import { database } from '../../utils/Constant';
  import { showPassword, isValidCredInput } from "../../utils/utils";

  let email = "",
    password = "",
    confirmPassword = "",
    error="",
    loading = false;
    
  onMount(async () => {
    const currentUserId: string|null = getUserFromLocalStorage();
    if (currentUserId && await database.isUserValid(currentUserId)) {
      console.log("Exists");
      goto("/home");
    } else {
      console.log("Doesnt exits");
      deleteUserFromLocalStorage();
    }
  });

  export const handleSubmit = async () => {
    loading = true;
    try{
      email = email.toLowerCase();
      isValidCredInput(email,password,confirmPassword);
      await database.createUser(email,password);
      goto('/login');
    } catch(err:any){
      error = err.message;
      loading = false;
      return;
    }
    email = "", password = "", confirmPassword = "", loading = false;
  };

</script>

<Navbar buttonType="Login" />

<!-- register page -->
<div class="flex flex-col items-center justify-center">
  <h1 class="text-2xl mt-4 font-bold">Signup Page</h1>
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
  <label class="form-control my-5 w-full max-w-xs">
    <div class="label">
      <span class="label-text text-lg">Password :</span>
      <span class="label-text-alt text-red-400">*Required</span>
    </div>
    <input
      type="password"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
      bind:value={password}
    />
  </label>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text text-lg">Confirm Password :</span>
      <span class="label-text-alt text-red-400">*Required</span>
    </div>
    <input
      id="userPassword"
      type="password"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
      bind:value={confirmPassword}
    />
    <div class="flex my-2 justify-between">
			<p>Show Password</p>
			<input class="checkbox" type="checkbox" on:click={() => showPassword()} />
		</div>
  </label>
  <button
    data-testid="signup-button"
    type="submit"
    on:click={() => handleSubmit()}
    disabled = {loading}
    class="btn btn-info btn-wide mt-10">Signup</button
  >
  <div class="text-center text-red-500">{error}</div>

</div>
