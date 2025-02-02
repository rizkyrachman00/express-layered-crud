// berkomunikasi dengan database
// menggunakan ORM / raw query
// file ini digunakan ketika case ganti2 ORM, maka tinggal edit file ini
// hanya bertanggung jawab mengambil data saja pada DB

const prisma = require("../db");

const findProducts = async () => {
  const products = await prisma.products.findMany();

  return products;
};

const findProductById = async (productId) => {
  const product = await prisma.products.findUnique({
    where: {
      id: productId,
    },
  });

  // in case ketika query diatas berat, tinggal ganti ke raw query
  // const product = await prisma.$executeRaw`SELECT * FROM products`;

  return product;
};

const findProductByName = async (productName) => {
  const product = await prisma.products.findFirst({
    where: {
      name: productName,
    },
  });

  return product;
};

const insertProduct = async (productData) => {
  const product = await prisma.products.create({
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });

  return product;
};

const deleteProduct = async (productId) => {
  const product = await prisma.products.delete({
    where: {
      id: productId,
    },
  });

  return product;
};

const editProduct = async (productId, productData) => {
  const product = await prisma.products.update({
    where: {
      id: productId,
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });

  return product;
};

module.exports = {
  findProducts,
  findProductById,
  findProductByName,
  insertProduct,
  deleteProduct,
  editProduct,
};
