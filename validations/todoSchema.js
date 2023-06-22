const Joi = require("./joi")

const contentSchema = Joi.string().min(5).required()

const createTodoSchema = Joi.object({
  content: contentSchema,
});

const idSchema = Joi.object({
    id: Joi.objectId()
})

const updateTodoSchema = Joi.object({
    content: contentSchema
})

module.exports = {
    createTodoSchema,
    idSchema,
    updateTodoSchema
}

