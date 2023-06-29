const express = require("express");
const validator = require("../middlewares/validator");
const addressSchema = require("../validations/addressSchema");
const addressController = require("../controllers/addressController");
const jwtAuth = require("../middlewares/jwtAuth");

const router = express.Router();

router.patch(
  "/",
  validator(addressSchema.update),
  jwtAuth,
  addressController.update
);

module.exports = router;
