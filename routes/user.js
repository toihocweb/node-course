const express = require("express");
const validator = require("../middlewares/validator");
const userSchema = require("../validations/userSchema");
const userController = require("../controllers/userController");
const jwtAuth = require("../middlewares/jwtAuth");

const router = express.Router();

router.patch(
  "/address",
  validator(userSchema.updateAddress),
  jwtAuth,
  userController.updateAddress
);

router.get("/me", jwtAuth, userController.getMe);

module.exports = router;
