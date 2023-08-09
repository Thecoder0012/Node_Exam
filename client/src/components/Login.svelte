<script>
  import { navigate, Link } from 'svelte-navigator';
  import axios from 'axios';
  import {BASE_URL} from '../store/globalStore.js';

  let email = '';
  let password = '';
  let message = '';
  let status = undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        $BASE_URL + "/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/home")
      }
    } catch (error) {
      message = error.response.data.message
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    if (event.target.name === 'email') {
      email = event.target.value;
    } else if (event.target.name === 'password') {
      password = event.target.value;
    }
  };


</script>

<div class="">
  <p id="message" style="{status === true ? "color: green": "color: red"}">{message}</p>
    <form on:submit={handleSubmit} class="container" method="POST">
      <h1>Login</h1>
      <p>
        <input
          id="Email"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          on:input={handleInputChange}
          autofocus
          required
        />
      </p>
      <p>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          on:input={handleInputChange}
          required
        />
      </p>
      <input type="submit" id="submit" value="Sign in" />
    </form>

    <div class="signUpButton">
      <p>
        <Link to="/register">Not registered yet? Sign up here!</Link>
      </p>
    </div>
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

.signUpButton {
    position: absolute;
    left: 44%;
    top: 55%;
}

</style>