const express = require("express")
const validator = require("../middlewares/validator")
const authSchema = require("../validations/authShema")
const authController = require("../controllers/authController")

const router = express.Router()

router.post("/register", validator(authSchema.registerSchema), authController.register)
router.post("/login", validator(authSchema.loginSchema), authController.login)

module.exports = router