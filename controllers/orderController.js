const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const Order = require("../models/mysql/Order");
const OrderProduct = require("../models/mysql/OrderProduct");
const Product = require("../models/mysql/Product");

const createOrder = asyncMiddleware(async (req, res, next) => {
  const { note, products } = req.body;
  const { id: userId } = req.user;

  const order = await Order.create({
    note,
    userId,
  });

  const prods = products.map((product) => ({
    orderId: order.id,
    productId: product.id,
    quantity: product.quantity,
  }));

  await OrderProduct.bulkCreate(prods);

  res.status(201).json({
    success: true,
  });
});

const getOrderDetailById = asyncMiddleware(async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: orderId } = req.params;

  const order = await Order.findOne({
    where: {
      id: orderId,
      userId,
    },
    include: [Product],
  });

  res.status(200).json({
    success: true,
    data: order,
  });
});

const getAllOrders = asyncMiddleware(async (req, res, next) => {
  const { id: userId } = req.user;

  const orders = await Order.findAll({
    where: {
      userId,
    },
    include: [Product],
  });

  res.status(200).json({
    success: true,
    data: orders,
  });
});

module.exports = {
  createOrder,
  getOrderDetailById,
  getAllOrders,
};
