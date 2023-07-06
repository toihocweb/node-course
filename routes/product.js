const express = require("express");
const validator = require("../middlewares/validator");
const userSchema = require("../validations/userSchema");
const productController = require("../controllers/productController");
const jwtAuth = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");

const router = express.Router();

router.get("/", productController.getProduct);

router.post("/", jwtAuth, authorize("owner"), productController.createProduct);

router.delete(
  "/:id",
  jwtAuth,
  authorize("owner"),
  productController.deleteProduct
);

router.patch(
  "/:id",
  jwtAuth,
  authorize("owner"),
  productController.updateProduct
);

module.exports = router;
