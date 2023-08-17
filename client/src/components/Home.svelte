<script>

  import { navigate } from 'svelte-navigator';
  import axios from 'axios';
  import {BASE_URL} from '../store/globalStore.js';
  import { onMount } from 'svelte';
  import Navbar from './Navbar.svelte';
  import Video from "../video/video.mp4";



  let user = "";

  

  function authenticated(response)  {
    return response.data.authenticated ? user = response.data.user.email : navigate("/");
  };




 
    onMount(async () => {
    try {
      const response = await axios.get($BASE_URL + "/login", { 
        withCredentials: true,
      });
      const auth = authenticated(response)
    } catch (error) {
      console.error(error);
    }
  });

</script>

<Navbar/>

<div class='video-container'>
  <div class="overlay"></div>
      <video class="video" src={Video} autoplay loop muted />
          <div class="content">
              <h1 class="welcome-msg">Welcome to the restaurant</h1>
          </div>
</div>


<style>
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');


.video {
  pointer-events: none;
}

.video-container {
  width: 100%;
  height: 100vh;
}

.video {
  pointer-events:none;        
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: absolute;
  left: 30%;
  top: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

  .welcome-msg {
    font-family: 'Pacifico';
    font-size: 3.5em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 2.5);
  }

 .video{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.278);
} 
</style>