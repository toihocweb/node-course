const Joi = require("./joi");

const updateAddress = Joi.object({
  city: Joi.string(),
  province: Joi.string(),
  address: Joi.string(),
  zip: Joi.string(),
});

module.exports = {
  updateAddress,
};
