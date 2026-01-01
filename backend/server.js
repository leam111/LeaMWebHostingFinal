const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("products"));

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error connecting to TiDB:', err.message);
    } else {
        console.log('✅ Connected to TiDB Cloud (Database: claude)');
        connection.release(); 
    }
});


app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "err0r fetching ", error: err });
    }
    res.json(results);
  });
});

app.post("/insert", (req, res) => {
  const { name, description, price, category, image } = req.body;
  const query =
    "INSERT INTO products (name , description, price , category, image) values (?,?,?,?,?)";
  db.query(
    query,
    [name, description, price, category, image],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "err0r inserting ", error: err });
      }
      res.json(results);
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM products WHERE id = ? ";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "error deleting", error: err });
    }
    res.json({ message: "product deleted successfully! , ", id: id });
  });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image } = req.body;
  const query =
    "UPDATE products SET name = ? , description = ? ,price = ? , category = ? , image = ? WHERE id = ?  ";
  db.query(
    query,
    [name, description, price, category, image, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "error updating", error: err });
      }
      res.json({ message: "product updated successfully", id: id });
    }
  );
});



app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});