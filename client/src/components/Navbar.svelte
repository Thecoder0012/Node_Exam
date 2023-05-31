<script>
import {Link} from "svelte-navigator";
import axios from "axios";
import {BASE_URL} from '../store/globalStore.js';



async function logout(){
    await axios.get($BASE_URL + "/destroy", { withCredentials: true });
}

</script>

<div class="container">
    <ul>
      <li> <Link classname="link" to="/homepage">Home</Link> </li>
      <li> <Link classname="link" to="/contact">Contact</Link> </li>
      <li> <Link classname="link" on:click={logout} to="/">Logout</Link> </li>
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
    padding: 50px;
 }
 
 
 .link{
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