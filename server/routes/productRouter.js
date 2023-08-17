import { Router } from "express";
import db from "../database/connection.js";
import "dotenv/config";

const router = Router();

router.get("/products", async (req,res) => {
    const [products] = await db.query(
        "SELECT * from products");
        res.status(200).send({products: products});
      
});

router.get("/products/:id", async (req,res) => {
    const [product] = await db.query(
        "SELECT * from products where id = ?",[req.params.id]);
        res.status(200).send({product: product});
});

router.post("/products", async (req,res) => {
    const { name, price, weight, supplier,discount } = req.body;
  try {
    const newProduct = await db.query(
      "INSERT INTO products (name, price,weight,supplier,discount) VALUES (?,?,?,?,?)",
      [name, price, weight,supplier,discount]
    );
    res.send({product: newProduct})
} catch(error){
    res.status(400).send("Something went wrong.")
}});

router.put('/products/:id', async (req, res) => {
    try {
      const {name,price,weight,supplier,discount} = req.body;
      
      const productId = req.params.id;
      const updateProduct = await db.query(
        "UPDATE products SET name = ?, price = ?, weight = ?, supplier = ?, discount = ? WHERE id = ?",
        [name, price, weight, supplier, discount, productId]
      );
            res.status(200).send(updateProduct);
    } catch (error) {
      res.status(500).json({ message: 'Problem with updating the product' });
    }
  });
  


router.delete('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await db.query("DELETE FROM products where id = ?",[productId]);
      res.status(200).send(deletedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Problem with deleting the product' });
    }
  });
  
export default router;