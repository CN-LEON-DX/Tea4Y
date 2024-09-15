// models/product.model.js

const mongoose = require("mongoose");
const { create } = require("./account.model");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    product_category_id: { type: String, default: "" },
    description: { type: String },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    thumbnail: { type: String },
    status: { type: String, default: "active" },
    featured: String,
    position: { type: Number },
    slug: { type: String, unique: true },
    createdBy: {
      accountID: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    deleted: { type: Boolean },
    deletedBy: {
      accountID: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        accountID: String,
        nameEditor: String,
        updatedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Products", productSchema, "products");
module.exports = Product;
