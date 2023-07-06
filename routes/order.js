const express = require("express");
const validator = require("../middlewares/validator");
const userSchema = require("../validations/userSchema");
const orderController = require("../controllers/orderController");
const jwtAuth = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { createOrder } = require("../validations/orderSchema");

const router = express.Router();

router.get(
  "/:id",
  jwtAuth,
  authorize("customer"),
  orderController.getOrderDetailById
);

router.get("/", jwtAuth, authorize("customer"), orderController.getAllOrders);

router.post(
  "/",
  jwtAuth,
  authorize("customer"),
  validator(createOrder),
  orderController.createOrder
);

// router.delete(
//   "/:id",
//   jwtAuth,
//   authorize("owner"),
//   productController.deleteProduct
// );

// router.patch(
//   "/:id",
//   jwtAuth,
//   authorize("owner"),
//   productController.updateProduct
// );

module.exports = router;
