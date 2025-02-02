const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  res.send("Halo Selamat Datang");
});

const productController = require("./product/product.controller");

app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`Express running in port : ${PORT}`);
});
