const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const Order = require("../models/mysql/Order");
const OrderProduct = require("../models/mysql/OrderProduct");
const Product = require("../models/mysql/Product");
const { ErrorResponse } = require("../response/ErrorResponse");

const createCoupon = asyncMiddleware(async (req, res, next) => {
  res.status(201).json({
    success: true,
  });
});

const getCoupon = asyncMiddleware(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});

const getCouponById = asyncMiddleware(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});

const deleteCoupon = asyncMiddleware(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});

module.exports = {
  createCoupon,
  getCoupon,
  getCouponById,
  deleteCoupon,
};
