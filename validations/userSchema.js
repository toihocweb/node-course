const { pwSchema, emailSchema } = require('./authShema');
const Joi = require('./joi');

const updateAddress = Joi.object({
  city: Joi.string(),
  province: Joi.string(),
  address: Joi.string(),
  zip: Joi.string(),
});

const changePassword = Joi.object({
  oldPassword: pwSchema,
  newPassword: pwSchema,
});

const forgotPassword = Joi.object({
  email: emailSchema,
});

const verifyForgotToken = Joi.object({
  token: Joi.string().required(),
});

const resetPassword = Joi.object({
  email: emailSchema,
  token: Joi.string().required(),
  newPassword: pwSchema,
});

module.exports = {
  updateAddress,
  changePassword,
  forgotPassword,
  verifyForgotToken,
  resetPassword,
};
