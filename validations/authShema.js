const Joi = require("./joi")

const pwSchema = Joi.string().min(6).required()
const emailSchema = Joi.string().email().required()

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: emailSchema,
  password: pwSchema,
  phone: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: emailSchema,
    password: pwSchema
})


const verifyOtpSchema = Joi.object({
  email: emailSchema,
  otp: Joi.string().min(6).max(6).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  pwSchema,
  emailSchema,
  verifyOtpSchema,
};