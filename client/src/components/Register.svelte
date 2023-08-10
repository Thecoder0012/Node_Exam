<script>
  import { Link } from 'svelte-navigator';
  import axios from 'axios';
  import {BASE_URL} from '../store/globalStore.js';
  
  let username = '';
  let email = '';
  let password = '';
  let message = '';
  let status = undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post($BASE_URL+'/signup', {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        message = response.data.message;
        status = true;

      }
    } catch (err) {
      message = err.response.data.message;
      status = false;
    }
  };

  const handleInputChange = (event) => {
    if (event.target.name === 'username') {
      username = event.target.value;
    }
      else if (event.target.name === 'email') {
      email = event.target.value;
    } else if (event.target.name === 'password') {
      password = event.target.value;
    }
  };

</script>


<div class="">

  <p id="message" style="{status === true ? "color: green": "color: red"}">{message}</p>

</div>
  <form on:submit={handleSubmit} class="container" method="POST">
    <h1>Sign up</h1>
     <p>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="Username"
        bind:value={username}
        on:input={handleInputChange}
        autofocus
        required/>
    </p>

    <p>
      <input
        id="Email"
        type="text"
        name="email"
        placeholder="Email"
        bind:value={email}
        on:input={handleInputChange}
        required
      />
    </p>
    <p>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Password"
        bind:value={password}
        on:input={handleInputChange}
        required
      />
    </p>
    <input type="submit" id="submit" value="Register" />
  </form>

  <div class="register">
    <p>
      <Link to="/">Sign in here if you have registered!</Link>
    </p>
  </div>


<style>


.container {
  position: absolute;
  left: 40%;
  top: 20%;
}

#message{
  left: 40%;
  top: 16%;
  position: absolute;
  font-size: 1.5em;
}

input {
  width: 170%;
  margin-top: 10px;
  height: 45px;
  color: black;
  border-radius: 5px;
  border: 1px solid grey;
}

input[placeholder] {
  font-size: 1em;
  text-indent: 9px;
}
  

  #submit {
    width: 172%;
    background: #3283ff;
    color: white;
    font-size: 1.3em;
    cursor: pointer;
  }

  #submit:hover {
    box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.5);
    transform: translateY(-2px);
    background-color: #0069d9;
    border-color: #0062cc;
    transition: 0.2s all;
  }

  .register {
    position: absolute;
    left: 43%;
    top: 64%;
  }
</style>
