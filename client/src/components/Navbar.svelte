<script>
   import axios from "axios";
   import {BASE_URL} from '../store/globalStore.js';
   import { onMount } from "svelte";

   
   let user = "";
   let user_role = undefined;
   
   function authenticated(response)  {
      if(response.data.authenticated){
         return user = response.data.user.username;
      }
     };
   
   async function logout(){
       await axios.get($BASE_URL + "/destroy", { withCredentials: true });
   }
   
   onMount(async () => {
         const response = await axios.get($BASE_URL + "/login", { 
           withCredentials: true,
         });
         const auth = authenticated(response);
         user_role = response.data.user.role;
     });
   
   </script>
   
   <div class="container">
       <ul>
         <li> <a  href="/home">Home</a> </li>
         <li> <a  href="/menu">Menu</a> </li>
         <li> <a  href="/chat">Chat</a> </li>
         <li> <a  href="/contact">Contact</a> </li>
         <li> <a id="logout" on:click={logout} href="/">Logout</a> </li>
       </ul>
     </div>
     <p class="msg">{user_role === 1 ? 'Admin:' : 'User:'} <button>{user}</button></p> 
   
   
   <style>
   @import url('https://fonts.googleapis.com/css2?family=Your+Font+Name&display=swap');

   *{
       margin: 0;
       padding: 0;
       box-sizing: border-box;
       border: none;
    }

  
   

     .msg {
    position: absolute;
    right: 3%;
    top: 5%;
    color: white;
    font-size: 14px;
  }

  .msg button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    text-decoration: underline;
    pointer-events: none;
    font-size: 14px;
  }
    
    li{
       list-style: none;
       display: inline;
       padding: 48px;
    }
   
    
    a{
       text-decoration: none;
       color: white;
       border-radius: 10px;
       font-weight: 100;
       font-family: 'Your Font Name', sans-serif;
    }

    #logout{
      position: absolute;
      right: 4.5%;
      top: 60%;
      font-size: 15px;
    }
   
    .container ul a:hover{
       text-decoration: underline;
    }
    
    .container {
      position: absolute;
      display: flex;
      font-size: 1.5em;
      font-weight: 400;
      top: 0%;
      padding: 2%;
      justify-content: center;
      background-color: black;
      color:white;
      width: 100%;
    }

    .container :not(:last-child){
      position: relative;
      left: 7%;
    }
   </style>