<script>
import axios from "axios";
import {BASE_URL} from '../store/globalStore.js';



async function logout(){
    await axios.get($BASE_URL + "/destroy", { withCredentials: true });
}

</script>

<div class="container">
    <ul>
      <li> <a classname="link" href="/home">Home</a> </li>
      <li> <a classname="link" href="/contact">Contact</a> </li>
      <li> <a classname="link" on:click={logout} href="/">Logout</a> </li>
    </ul>
  </div>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
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
   /* position: absolute; */
   display: flex;
   font-size: 1.5em;
   font-weight: 400;
   padding: 2%;
   justify-content: center;
   background-color: black;
   width: 100%;
 }
</style>