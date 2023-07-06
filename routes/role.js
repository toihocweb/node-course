const express = require("express");
const validator = require("../middlewares/validator");
const roleController = require("../controllers/roleController");
const { updateRole } = require("../validations/roleSchema");

const router = express.Router();

router.patch("/", validator(updateRole), roleController.makeOwner);

module.exports = router;
