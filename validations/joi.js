const Joi = require("joi")
const mongoose = require("mongoose")

const isValidObjectId = (value ,helper) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error("any.invalid")
    }
    return value
}

Joi.objectId = () =>  Joi.custom(isValidObjectId)

module.exports = Joi