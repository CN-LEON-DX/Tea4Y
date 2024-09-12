// models/product.model.js

const mongoose = require("mongoose");
const generateToken = require("../helpers/generateToken.helper");

const accountSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String, default: generateToken.genRandomKey(10) },
    phone: { type: String },
    avatar: { type: String },
    roleID: { type: String },
    status: { type: String },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Accounts = mongoose.model("accounts", accountSchema, "accounts");
module.exports = Accounts;
