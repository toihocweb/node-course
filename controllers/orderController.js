const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const Order = require("../models/mysql/Order");
const OrderProduct = require("../models/mysql/OrderProduct");
const Product = require("../models/mysql/Product");
const { ErrorResponse } = require("../response/ErrorResponse");

const createOrder = asyncMiddleware(async (req, res, next) => {
  const { note, products } = req.body;
  const { id: userId } = req.user;

  const order = await Order.create({
    note,
    userId,
  });

  // Order - Product

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
  const { id: userId, role } = req.user;

  let orders = [];
  if (role === "customer") {
    orders = await Order.findAll({
      where: {
        userId,
      },
      include: [Product],
    });
  }

  if (role === "owner") {
    orders = await Order.findAll({
      include: [Product],
    });
  }

  res.status(200).json({
    success: true,
    data: orders,
  });
});

const deleteOrderById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  await Order.destroy({
    where: {
      id,
    },
  });

  await OrderProduct.destroy({
    where: {
      orderId: id,
    },
  });

  res.status(200).json({
    success: true,
    message: "Order deleted",
  });
});

const cancelOrderById = asyncMiddleware(async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { id } = req.params;
  const { reason } = req.body;

  const order = await Order.findOne({
    where: {
      id,
    },
  });

  if (!order) {
    throw new ErrorResponse(404, "Order not found");
  }

  if (!["pending", "approved"].includes(order.status)) {
    throw new ErrorResponse(400, "You can not cancel this order");
  }

  const { userId: orderUserId } = order;
  if (role === "customer" && orderUserId !== userId) {
    throw new ErrorResponse(403, "You are not allowed to cancel this order");
  }

  if (role === "customer" && order.status !== "pending") {
    throw new ErrorResponse(400, "You can not cancel this order");
  }

  order.status = "cancelled";
  order.cancelledBy = userId;
  order.cancelled_at = new Date();
  order.cancelledReason = reason;
  await order.save();

  res.json({
    success: true,
    message: "Order cancelled",
  });
});

const setOrderDone = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
    },
  });

  if (!order) {
    throw new ErrorResponse(404, "Order not found");
  }

  order.status = "done";
  order.received_at = new Date();
  await order.save();
  res.json({
    success: true,
    message: "Order done",
  });
});

const setOrderDelivery = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
    },
  });

  if (!order) {
    throw new ErrorResponse(404, "Order not found");
  }

  order.status = "delivery";
  await order.save();
  res.json({
    success: true,
    message: "Order delivery",
  });
});

module.exports = {
  createOrder,
  getOrderDetailById,
  getAllOrders,
  deleteOrderById,
  cancelOrderById,
  setOrderDone,
  setOrderDelivery,
};
