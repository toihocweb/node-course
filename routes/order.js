const express = require('express');
const validator = require('../middlewares/validator');
const userSchema = require('../validations/userSchema');
const orderController = require('../controllers/orderController');
const jwtAuth = require('../middlewares/jwtAuth');
const { authorize } = require('../middlewares/authorize');
const { createOrder, cancelOrder } = require('../validations/orderSchema');

const router = express.Router();

router.get(
  '/:id',
  jwtAuth,
  authorize('customer'),
  orderController.getOrderDetailById,
);

router.get(
  '/',
  jwtAuth,
  authorize('customer', 'owner'),
  orderController.getAllOrders,
);

router.post(
  '/',
  jwtAuth,
  authorize('customer'),
  validator(createOrder),
  orderController.createOrder,
);

router.delete(
  '/:id',
  jwtAuth,
  authorize('owner'),
  orderController.deleteOrderById,
);

router.patch(
  '/:id/cancel',
  jwtAuth,
  authorize('owner', 'customer'),
  validator(cancelOrder),
  orderController.cancelOrderById,
);

router.patch(
  '/:id/done',
  jwtAuth,
  authorize('owner'),
  orderController.setOrderDone,
);

router.patch(
  '/:id/delivery',
  jwtAuth,
  authorize('owner'),
  orderController.setOrderDelivery,
);

module.exports = router;
