<script>
    import axios from "axios";
    import { BASE_URL } from "../store/globalStore.js";


  export let p_name;
  export let price;
  export let weight;
  export let supplier;
  export let discount;
  export let foundProduct;
  export let updateForm;
  export let products = [];
  export let removeForm;
  export let fetchProducts;
  export let showProductList;

  async function updateProduct(product, id){
    try {
      const updateProduct = await axios.put($BASE_URL + '/products/' + id, product, {
        withCredentials: true
      });
            fetchProducts()
            showProductList();
    } catch (error) {
      console.error(error);
    }
  };

</script>


{#if updateForm}
<div class="edit-product">
  <table>
    <thead>
      <tr>
        <th>Product name</th>
        <th>Price</th>
        <th>Weight</th>
        <th>Supplier</th>
        <th>Discount %</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody class="product">
      {#each products as product}
        {#if foundProduct.id === product.id}
          <tr>
            <td><input type="text" placeholder={product.name} bind:value={p_name} /></td>
            <td><input type="number" placeholder={product.price} bind:value={price} /></td>
            <td><input type="number" placeholder={product.weight} bind:value={weight} /></td>
            <td><input type="text" placeholder={product.supplier} bind:value={supplier} /></td>
            <td><input type="number" placeholder={product.discount} bind:value={discount} /></td>

            <td>
              <input
                class="edit-product-button"
                on:click={async () => {
                    const newProduct = {
                    name: p_name ?? foundProduct.p_name,
                    price: price ?? foundProduct.price,
                    weight: weight ?? foundProduct.weight,
                    supplier: supplier ?? foundProduct.supplier,
                    discount: discount ?? foundProduct.discount
                    };
                  updateProduct(newProduct, product.id);
                }}
                value="Update"
                type="submit"
              />

              <input
              class="cancel-product-button"
              on:click={removeForm}
              value="Cancel"
              type="button"
            />
            </td>

            
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
</div>
{/if}


<style>
    .edit-product {
    font-family: Arial, sans-serif;
    border-collapse: collapse;
    width: 60%;
    position: absolute;
    left: 23%;
    top: 37%;
  }

  .edit-product table {
    width: 100%;
  }

  .edit-product th,
  .edit-product td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  .edit-product th {
    background-color: #e1e0e0;
  }

  .edit-product input[type="text"],
  .edit-product input[type="number"] {
    width: 50%;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .edit-product-button {
    background-color: #3283ff;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  .cancel-product-button {
    background-color: #dd3a16;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  .edit-product-button:hover {
    background-color: #0069d9;
  }

  .cancel-product-button:hover{
    background-color: #9a280f;

  }
</style>