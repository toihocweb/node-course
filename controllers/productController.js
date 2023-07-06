const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const Category = require("../models/mysql/Category");
const Product = require("../models/mysql/Product");

const createProduct = asyncMiddleware(async (req, res, next) => {
  const { name, description, price, amount, categoryId } = req.body;

  await Product.create({
    name,
    description,
    price,
    amount,
    categoryId,
  });

  res.status(201).json({
    success: true,
  });
});

const getProduct = asyncMiddleware(async (req, res, next) => {
  const products = await Product.findAll({
    include: Category,
  });

  res.status(200).json({
    success: true,
    data: products,
  });
});

const deleteProduct = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  await Product.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    success: true,
    message: "Delete category successfully",
  });
});

const updateProduct = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  const { name, description, price, amount, categoryId } = req.body;

  await Product.update(
    {
      name,
      description,
      price,
      amount,
      categoryId,
    },
    {
      where: {
        id,
      },
    }
  );

  res.status(200).json({
    success: true,
    message: "Update category successfully",
  });
});

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};
