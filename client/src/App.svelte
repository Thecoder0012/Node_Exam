<script>
	import {Router, Route } from "svelte-navigator";
  import Register from "./components/Register.svelte";
  import Login from "./components/Login.svelte";
  import Home from "./components/Home.svelte";
  import Contact from "./components/Contact.svelte";
  import Product from "./components/Product.svelte";
  import Chat from "./components/Chat.svelte";
</script>

<Router>
  <Route path="/"><Login/></Route>
  <Route path="/home"><Home/></Route>
  <Route path="/register"><Register/></Route>
  <Route path="/contact"><Contact/></Route> 
  <Route path="/chat"><Chat/></Route>
  <Route path="/menu"><Product/></Route>
</Router>
