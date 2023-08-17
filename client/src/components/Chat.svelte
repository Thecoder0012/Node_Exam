<script>
    import { BASE_URL } from "../store/globalStore.js";
    import Navbar from "./Navbar.svelte";
    import io from 'socket.io-client';
    import { onMount } from "svelte";

    let message = "";
    let incomingMessages = [];
    let username = ""

    let socket = io($BASE_URL);

    function messageSender(){
    const messageData = {
    username,
    message
  };
  socket.emit("mymessage", messageData);
}

    function handleInputChange(event){
        message = event.currentTarget.value
    }

    onMount(async () => {
    try {
        socket.on("message_receiver",(data) => {
        incomingMessages = [...incomingMessages, data];
      })
    } catch (error) {
      console.error(error);
    }
  });
   

 </script>

 <Navbar/>

 <div class="title">
    <h1>Restaurant chat</h1>
  </div>
<div class="container">
    <div class="chat">
        <h2 class="chat-title">Contact admin</h2>
        <div class="chat-message">
            {#each incomingMessages as message}
                <div class="message">
                    <span class="username">{message.username}:</span>
                    <span class="message-text">{message.message}</span>
                </div>
            {/each}
        </div>
        <div class="inputs">
            <input name="username" placeholder="Type in username" bind:value={username} />
            <input name="message" placeholder="Type in your message" on:input={handleInputChange}>
            <button class="button" on:click={messageSender}>Send</button>
        </div>
    </div>
</div>

<style>

.title{
    position: absolute;
    top: 14%;
    left: 38%;
    font-size: 1.5em;
    font-family:applegothic;
}

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .chat {
        width: 29%;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 4px 6px 14px rgba(0, 0, 0, 0.2);
        background-color: whitesmoke;
    }

    .chat-title {
        text-align: center;
    }

    .message {
        margin-bottom: 8px;
        padding: 6px 10px;
        border-radius: 8px;
        background-color: #eae8e8;
    }

    .username {
        font-weight: bold;
        color: #333;
    }

    .message-text {
        margin-left: 6px;
    }

    .inputs {
        display: flex;
        gap: 15px;
    }

    .button {
        background-color: #007bff;
        color: white;
        width: 50%;
        border: none;
        border-radius: 10px;
        padding: 10px 12px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .button:hover {
        background-color: #0056b3;
    }
</style>
