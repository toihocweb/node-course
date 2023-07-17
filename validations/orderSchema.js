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

const cancelOrder = Joi.object({
  reason: Joi.string().required(),
});

module.exports = {
  createOrder,
  cancelOrder,
};
