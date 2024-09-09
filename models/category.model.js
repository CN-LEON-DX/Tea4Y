// models/product.model.js

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    parentID: { type: String, default: "" },
    description: { type: String },
    thumbnail: { type: String },
    status: { type: String, default: "active" },
    position: { type: Number },
    slug: { type: String, unique: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema, "category");
module.exports = Category;
