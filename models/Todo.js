
const mongoose = require("mongoose")
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    content: String,
    isCompleted: {
      type: Boolean,
      default: false,
    },
    email: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// tao 1 virtual field
todoSchema.virtual("userEmail", {
  localField: "email",

  foreignField: "email",
  ref: "User",
  justOne: true,
});

// collection: todos 
module.exports = mongoose.model("Todo", todoSchema)