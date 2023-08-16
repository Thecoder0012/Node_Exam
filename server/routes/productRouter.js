import { Router } from "express";
import db from "../database/connection.js";
import "dotenv/config";

const router = Router();

router.get("/products", async (req,res) => {
    const [products] = await db.query(
        "SELECT * from products");
        res.send({products: products});
      
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


export default router;