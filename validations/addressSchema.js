const Joi = require("./joi");

const update = Joi.object({
  city: Joi.string().required(),
  province: Joi.string().required(),
  address: Joi.string().required(),
  zip: Joi.string().required(),
});

module.exports = {
  update,
};
