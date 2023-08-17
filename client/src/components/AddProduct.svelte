
<script>
    import axios from "axios";
    import { BASE_URL } from "../store/globalStore.js";

  export let p_name;
  export let price;
  export let weight;
  export let supplier;
  export let discount;
  export let addProduct;
  export let showProductList;
  export let fetchProducts;
  export let showLoading;


  async function createProduct(e) {
  e.preventDefault();

  try{
    const response = await axios.post(
        $BASE_URL + "/products",
        {
          name: p_name,
          price: price,
          weight: weight,
          supplier: supplier,
          discount: discount
        },
        { withCredentials: true }
      );

      var sleep = 600;
        setTimeout(async function() {
            addProduct = false; 
            showLoading();
            fetchProducts()
            showProductList();
        }, sleep);        

            

  }catch(error){
    console.log(error)
  }finally{
    
  }
}
</script>

{#if addProduct}

<div class="form-container">
    <form>
      <h1 class="title">Add new product</h1>
      
      <div class="input-form">
        <label>Product name</label>
        <input type="text" bind:value={p_name} />
        
        <label>Price $</label>
        <input type="number" bind:value={price} />
        
        <label>Weight in grams</label>
        <input type="number" bind:value={weight} />

        <label>Supplier name</label>
        <input type="text" bind:value={supplier} />

        <label>Discount %</label>
        <input type="number" bind:value={discount} />
        
        <input class="submit" value="Create" on:click={createProduct} type="submit" />
      </div>
    </form>
  </div>

  {/if}

  <style>
   .form-container {
    position: absolute;
    left: 33%;
    top: 30%;
    width: 32%;
    display: flex;
    justify-content: center;
    align-content: center;
    border-radius: 10px;
    background-color: #e9e7e7;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    padding: 23px;
  }

  .title {
    font-size: 1.5em;
    margin-bottom: 18px;
  }

  .input-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
  }

  .input-form input {
    width: 95%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1.2em;
  }

  .submit {
    background-color: #0580d3;
    position: relative;
    left: 4.5%;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1.3em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .submit:hover {
    background-color: #025b97;
  }
  </style>