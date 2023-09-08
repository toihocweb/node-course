const mongoose = require('mongoose');

const registerOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

registerOtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 5 });

module.exports = mongoose.model('RegisterOtp', registerOtpSchema);
