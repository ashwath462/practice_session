<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar/Navbar.svelte";
    import Footer from "$lib/components/Footer/Footer.svelte";
</script>

<div class="bg-slate-200 min-h-[100vh]">
    <Navbar/>
        <slot />
    <Footer/>
</div>