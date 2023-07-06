const Joi = require("./joi");

const createCategory = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
});

const updateCategory = Joi.object({
  name: Joi.string(),
  slug: Joi.string(),
});

module.exports = {
  createCategory,
  updateCategory,
};
