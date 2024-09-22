const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: { type: String },
    otp: String,
    expireAt: { type: Date, expires: 3000 },
  },
  {
    timestamps: true,
  }
);

const ForgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema,
  "forgotPassword"
);
module.exports = ForgotPassword;
