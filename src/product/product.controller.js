// layer untuk handle request dan response
// untuk handle validasi body juga

const express = require("express");
const prisma = require("../db");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProductData,
  deleteProductById,
  editProductById,
} = require("./product.service");

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    
    if (typeof productId != "string") {
      throw Error("Id is not a string");
    }

    const product = await getProductById(productId);

    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {

    const newProductData = req.body;

    const product = await createProductData(newProductData);

    res.send({
      data: product,
      message: "Created Product Success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    await deleteProductById(productId);

    res.send("Succes Delete Produk");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const dataProduct = req.body;

    if (
      !(
        dataProduct.name &&
        dataProduct.price &&
        dataProduct.description &&
        dataProduct.image
      )
    ) {
      return res.status(400).json("Some Field Empty");
    }

    const product = await editProductById(productId, dataProduct);

    res.send({
      data: product,
      message: "Update produk sukses",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const dataProduct = req.body;

    const product = await editProductById(productId, dataProduct);

    res.send({
      data: product,
      message: "Patch produk sukses",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
