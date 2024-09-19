// models/product.model.js

const mongoose = require("mongoose");
const generateToken = require("../helpers/generateToken.helper");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String, default: generateToken.genRandomKey(10) },
    phone: { type: String },
    avatar: { type: String },
    roleID: { type: String },
    status: { type: String, default: "active"},
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema, "users");
module.exports = User;
