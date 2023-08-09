<script>
    import axios from "axios";
    import { BASE_URL } from "../store/globalStore.js";
    import Navbar from "./Navbar.svelte";
    
    let name = '';
    let email = '';
    let message = '';
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post($BASE_URL+'/contact', {
        name,
        email,
        message
      });
      if (response.status === 200) {
        message = response.data.message;
      }
    } catch (err) {
      message = err.response.data.message;
    }
  };

  const handleInputChange = (event) => {
    if (event.target.name === 'name') {
      name = event.target.value;
    } else if (event.target.name === 'email') {
      email = event.target.value;
    } else if (event.target.name === 'message') {
      message = event.target.value;
    }
  };

  </script>



<Navbar/>
<div class="container">
    <h1>Contact us!</h1>
  
    <form on:submit={handleSubmit}>
      <div class="form-container">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your name" bind:value={name} on:input={handleInputChange}
        required>
      </div>
  
      <div class="form-container">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Your email" bind:value={email} on:input={handleInputChange}
        required>
      </div>
  
      <div class="form-container">
        <label for="message">Message:</label>
        <textarea id="message" name="message" placeholder="Your message" bind:value={message} on:input={handleInputChange}
        required></textarea>
      </div>
  
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>


<style>
    .container {
      text-align: center;
      margin-top: 50px;
    }
  
    h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }
  
    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }
  
    .form-container label {
      margin-bottom: 5px;
      font-weight: bold;
    }
  
    .form-container input,
    .form-container textarea {
      width: 300px;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .form-container textarea {
      height: 150px;
    }
  
    .submit-btn {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .submit-btn:hover {
      background-color: #45a049;
    }
  </style>
  
  

  