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

router.patch(
  "/change-password",
  validator(userSchema.changePassword),
  jwtAuth,
  userController.changePassword
);

router.post(
  "/forgot-password",
  validator(userSchema.forgotPassword),
  userController.forgotPassword
);

router.post(
  "/verify-token",
  validator(userSchema.verifyForgotToken),
  userController.verifyForgotToken
);

router.post(
  "/reset-password",
  validator(userSchema.resetPassword),
  userController.resetPassword
);





module.exports = router;
