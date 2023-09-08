const Joi = require('./joi');

const updateRole = Joi.object({
  userId: Joi.number(),
});

module.exports = {
  updateRole,
};
