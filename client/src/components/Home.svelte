<script>

  import { navigate } from 'svelte-navigator';
  import axios from 'axios';
  import {BASE_URL} from '../store/globalStore.js';
  import { onMount } from 'svelte';
  import Navbar from './Navbar.svelte';
  import io from 'socket.io-client';

  let socket = io($BASE_URL);

  function messageSender(){
    socket.emit("mymessage",{message})
  }


  let user = "";
  let message = ""
  let incomingMessage = "";

  function authenticated(response)  {
    return response.data.authenticated ? user = response.data.user.email : navigate("/home");
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
<div class="authenticated">
    <h1>Welcome {user} to this application</h1>

    <input name="mess" placeholder="Type in your message" on:input={handleInputChange}>
    <button on:click={messageSender}>Send message</button>
    <h2> Message </h2>
    {incomingMessage}
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
</style>