const mongoose = require("mongoose");

const forgotToken = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

forgotToken.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

module.exports = mongoose.model("ForgotToken", forgotToken);
