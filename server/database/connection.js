import mysql from "mysql2/promise";
import "dotenv/config";


const db = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


async function createTable() {
  const connection = await db.getConnection();
  try {
    // await connection.query(`DROP TABLE IF EXISTS users`);
    // await connection.query(`DROP TABLE IF EXISTS products`);
    
    await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role BOOLEAN NOT NULL DEFAULT FALSE
      )
  `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INTEGER,
        weight DOUBLE,
        supplier VARCHAR(255) NOT NULL,
        discount Double
      )
    `);
  } catch (error) {
    console.error("Could not create the tables.:", error);
  } finally {
    connection.release();
  }
}
createTable();
export default db;