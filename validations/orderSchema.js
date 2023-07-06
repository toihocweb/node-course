const Joi = require("./joi");

const createOrder = Joi.object({
  note: Joi.string().allow(null, ""),
  products: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
});

module.exports = {
  createOrder,
};
