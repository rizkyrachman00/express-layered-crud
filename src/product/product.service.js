// service layer untuk handle bisnis logic

// agar service dibawah bisa dipakai diberbagai controller / file lain / reuseable

const prisma = require("../db");
const {
  findProducts,
  findProductById,
  insertProduct,
  findProductByName,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    // return res.status(400).send("Produk Not Found");
    throw Error("Product Not Found");
  }

  return product;
};

const createProductData = async (newProductData) => {
  if (
    !(
      newProductData.name &&
      newProductData.price &&
      newProductData.description &&
      newProductData.image
    )
  ) {
    throw Error("Some Field Empty");
  }

  const productName = await findProductByName(newProductData.name);

  if (productName) {
    throw new Error("Produk name must unique");
  }

  const product = await insertProduct(newProductData);

  return product;
};

const deleteProductById = async (productId) => {
  await getProductById(productId);

  return await deleteProduct(productId);
};

const editProductById = async (productId, productData) => {
  getProductById(productId);

  const product = await editProduct(productId, productData);

  return productData;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProductData,
  deleteProductById,
  editProductById,
};
