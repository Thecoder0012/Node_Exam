<script>
   import axios from "axios";
   import {BASE_URL} from '../store/globalStore.js';
       import { onMount } from "svelte";
       import { navigate } from "svelte-navigator";
   
   let user = "";
   
   function authenticated(response)  {
      if(response.data.authenticated){
         return user = response.data.user.username;
      }
     };
   
   async function logout(){
       await axios.get($BASE_URL + "/destroy", { withCredentials: true });
   }
   
   onMount(async () => {
         const response = await axios.get("http://localhost:8080/login", { 
           withCredentials: true,
         });
         const auth = authenticated(response)
     });
   
   </script>
   
   <div class="container">
       <ul>
         <li> <a  href="/home">Home</a> </li>
         <li> <a  href="/food">Food</a> </li>
         <li> <a  href="/contact">Contact</a> </li>
         <li> <a  on:click={logout} href="/">Logout</a> </li>
       </ul>
     </div>
     <p class="msg">Logged in as: <button>{user}</button></p> 
   
   
   <style>
   *{
       margin: 0;
       padding: 0;
       box-sizing: border-box;
       border: none;
    }
   
    .msg{
      position: absolute;
      right: 3%;
      top: 5%;
      color: white;
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
   
    }
   
    .container ul a:hover{
       text-decoration: underline;
    }
    
    .container{
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
   </style>