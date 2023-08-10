<script>

  import { navigate } from 'svelte-navigator';
  import axios from 'axios';
  import {BASE_URL} from '../store/globalStore.js';
  import { onMount } from 'svelte';
  import Navbar from './Navbar.svelte';
  import io from 'socket.io-client';
  import Video from "../video/video.mp4";


  let socket = io($BASE_URL);

  function messageSender(){
    socket.emit("mymessage",{message})
  }


  let user = "";
  let message = ""
  let incomingMessage = "";

  function authenticated(response)  {
    return response.data.authenticated ? user = response.data.user.email : navigate("/");
  };


  function handleInputChange(event){
      message = event.currentTarget.value
  }

 
    onMount(async () => {
    try {
      socket.on("message_receiver",(data) => {
        incomingMessage = data.message
      })
      const response = await axios.get("http://localhost:8080/login", { 
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
      <video class="video" src={Video} autoPlay controls loop muted />
          <div class="content">
              <h1>Velcome to the restaurant</h1>
          </div>
</div>




<style>

  
.authenticated {
  position: absolute;
  left: 30%;
  top: 25%;
}

 input {
    width: 300px;
    padding: 10px;
    margin-right: 11px;
    margin-top:5px;
    border: 1.5px solid #ccc;
    border-radius: 5px;
  }

  button {
    width: 20%;
    padding: 13px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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
  left: 38%;
  top: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}


 /* .video{
  position: absolute;
  pointer-events: all;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.278);
}  */
</style>