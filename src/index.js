const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  res.send("Halo Selamat Datang");
});

app.get("/products", async (req, res) => {
  const products = await prisma.products.findMany();

  res.send(products);
});

app.post("/products", async (req, res) => {
  const newProductData = req.body;

  const product = await prisma.products.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
      image: newProductData.image,
    },
  });

  res.send({
    data: product,
    message: "Created Product Success",
  });
});

app.delete("/product/:id", async (req, res) => {
  const productId = req.params.id;

  await prisma.products.delete({
    where: {
      id: productId,
    },
  });

  res.send({
    message: `Succesful Deleted Product ${productId} `,
  });
});

app.listen(PORT, () => {
  console.log(`Express running in port : ${PORT}`);
});
