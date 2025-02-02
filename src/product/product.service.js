// service layer untuk handle bisnis logic

// agar service dibawah bisa dipakai diberbagai controller / file lain / reuseable

const prisma = require("../db");

const getAllProducts = async () => {
  const products = await prisma.products.findMany();

  return products;
};

const getProductById = async (id) => {
  if (typeof id != "string") {
    throw Error("Id is not a string");
  }

  const product = await prisma.products.findUnique({
    where: {
      id,
    },
  });

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

  const product = await prisma.products.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
      image: newProductData.image,
    },
  });

  return product;
};

const deleteProductById = async (productId) => {
  await getProductById(productId);

  return await prisma.products.delete({
    where: {
      id: productId,
    },
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProductData,
  deleteProductById,
};
