<script>

  import { navigate } from 'svelte-navigator';
  import axios from 'axios';
  import {BASE_URL} from '../store/globalStore.js';
  import { onMount } from 'svelte';
  import Navbar from './Navbar.svelte';


  let user = "";
  const authenticated = (response) => {
    if (response.data.authenticated) {
      user = response.data.user.email;
      console.log("user");
    } else {
      navigate('/'); 
    }
  };
  

    onMount(async () => {
    try {
      const response = await axios.get(`${$BASE_URL}/login`, { withCredentials: true });
      const auth = authenticated(response);
    } catch (error) {
    }
  });

</script>

<Navbar/>
<div class="authenticated">
    <h1>Welcome {user}</h1>
</div>



<style>
.authenticated {
  position: absolute;
  left: 30%;
  top: 25%;
}
</style>