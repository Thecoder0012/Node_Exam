<script>
    import { onMount } from "svelte";
    import Navbar from "./Navbar.svelte";
    import axios from 'axios';
    import {BASE_URL} from '../store/globalStore.js';
    import AddProduct from "./AddProduct.svelte";
    import UpdateProduct from "./UpdateProduct.svelte";

    let products = []
    let user = undefined
    let p_name;
    let price;
    let weight;
    let supplier;
    let discount;
    let addProduct = false;
    let showProducts = true;
    let loading = false;
    let updateForm;
    let foundProduct;


    let currentPage = 1;
    const itemsPerPage = 4; 


    onMount(async () => {
        fetchProducts();
        fetchRole();
});

async function fetchProducts(){
  const response = await axios.get($BASE_URL + "/products", { 
        withCredentials: true,
      });
      if(response.status === 200){
        products = response.data.products;
      }
} 

async function fetchRole(){
  const response = await axios.get($BASE_URL + "/login", { 
        withCredentials: true,
      });
      if(response.status === 200){
        user = response.data.user;
      }
} 

function toggleProductForm() {
    addProduct = !addProduct;
    showProducts = !showProducts;
  }


   function showProductList() {
    showProducts = true;
    addProduct = false;
    updateForm = false;
    setTimeout(() => {
      loading = false;
    }, 500);
  }

 async function deleteProduct(id){
        if(!window.confirm("Are you sure about deleting this product?")){
            return;
        }
        const deleteProduct = await axios.delete($BASE_URL + '/products/' + id, {
            method: "DELETE"
        });
            fetchProducts();
            showProductList();
}




  async function findProductById(id){
  try {
      const findProduct = await axios.get($BASE_URL + '/products/' + id, {
        withCredentials: true
      });
      foundProduct = findProduct.data.product;
    } catch (error) {
      console.log(error.message);
    }
}

function toggleUpdateForm(productId) {
    updateForm = true; 
    showProducts = false;
    foundProduct = products.find(product => product.id === productId);
  }

  function removeForm() {
    updateForm = false;
    showProducts = true;
  }

  function showLoading(){
    loading = true
  }


</script>

<Navbar/>

<div class="title">
  <h1>Products</h1>
</div>

{#if user && user.role == 1}
<button class="add-button" on:click={toggleProductForm}>
  Add Product
</button>
{/if}

{#if showProducts}
<div class="products-container">
  
  <table class="products">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Weight</th>
        <th>Supplier</th>
        <th>Discount</th>


        {#if user && user.role === 1}
        <th>Actions</th>

        {/if}
      </tr>
    </thead>
    {#if loading}
      <tbody>
        <tr>
          <td colspan="6" style="font-size: 1.5em; text-align: center;">Loading...</td>
        </tr>
      </tbody>
    {:else}
      <tbody class="product">
        {#each products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as product}
          <tr>
            <td>{product.name}</td>
            <td>{product.price.toFixed(2)} $</td>
            <td>{product.weight} g</td>
            <td>{product.supplier}</td>
            <td>{product.discount} %</td>

            {#if user && user.role === 1}
            <td>
              <button on:click={() => {
                deleteProduct(product.id)
              }} class="delete-button">Delete</button>

              <button on:click={() => {
                toggleUpdateForm(product.id);
              }} class="update-button">Update</button>
            </td>
            {/if} 
           
          </tr>
    
        {/each}
      </tbody>

  

      <div class="pagination">
        <button class="pagination-button"
        on:click={() => currentPage -= 1} disabled={currentPage === 1}>Previous</button>
        <span class="current-page">Current page: {currentPage}</span>
        <button class="pagination-button"
        on:click={() => currentPage += 1} disabled={currentPage * itemsPerPage >= products.length}>Next</button>
      </div>
      <div class="all-products">
        <p>Total Products: {products.length}</p>
      </div>    {/if}
  </table>
</div>

{/if}

<UpdateProduct p_name={p_name} price={price} 
weight={weight} 
supplier={supplier} foundProduct={foundProduct} 
discount={discount} updateForm={updateForm} 
products={products} removeForm={removeForm} 
showProductList={showProductList} 
fetchProducts={fetchProducts}/>
  
  {#if addProduct}
  <AddProduct p_name={p_name} price={price} weight={weight} 
  supplier={supplier} 
  discount={discount} addProduct={addProduct} 
  showProductList={showProductList} 
  fetchProducts={fetchProducts}
  showLoading={showLoading} />
  {/if}
  



<style>

/* :global(body){
  background-color: lightcyan;
} */

.products-container {
    margin-top: 10.5%;
    display: flex;
}

.title{
    position: absolute;
    top: 14%;
    left: 43%;
    font-size: 1.5em;
    font-family:applegothic;
}

.products {
    font-family: serif;
    border-collapse: collapse;
    width: 65%;
    margin: 5% 20%;
}

.products th, .products td {
    border: 1.5px solid #dddddd;
    text-align: center;
    padding: 12px;
}

.products th {
    background-color: #f2f2f2;
}

.products td {
    background-color: white;
}

.products th {
    font-weight: 700;
    font-size: 14px;
}

.products th {
    font-size: 16px;
}


.add-button {
    background-color: #0069d9;
    border-color: #0062cc;
    transition: 0.2s all;
    color: white;
    position: absolute;
    top: 20%;
    left: 20.2%;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.add-button:hover {
    background-color: #0159b7;
}


.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 78%;
    margin-top: 5%;
  }

  .pagination-button {
    padding: 6px 15px;
    border: 2px solid #ccc;
    background-color: #f7f7f7;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  .pagination-button:hover {
    background-color: #e0e0e0;
  }

  .pagination-button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .current-page {
    margin: 0 20px;
    font-weight: bold;
    font-size: 18px;
  }

  .delete-button {
    background-color: #e74c3c;
    color: white;
    padding: 3px 8px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .delete-button:hover {
    background-color: #ab3325;
  }

  .update-button {
    background-color: #2b82bc;
    padding: 3px 8px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .update-button:hover {
    background-color: #216c9e;
  }

  .all-products{
    position: relative;
    left: 82%;
    text-align: center;
  }
</style>