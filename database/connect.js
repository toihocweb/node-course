const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/nodejs-course")
}

module.exports = connectDB