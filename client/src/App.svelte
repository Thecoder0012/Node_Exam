<script>
	import { Router, Route } from "svelte-navigator";
  import Register from "./components/Register.svelte";
  import Login from "./components/Login.svelte";
  import Home from "./components/Home.svelte";
</script>

<Router>
  <Route path="/"><Login /></Route>
  <Route path="/home"><Home/></Route>
  <Route path="/register"><Register/></Route>
</Router>