
// models/product.model.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userID: String,
    products: [
        {
            productID: String,
            quantity: Number,
        }
    ],
    createdBy: {
      accountID: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    deleted: { type: Boolean, default: false },
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

const Cart = mongoose.model("Carts", cartSchema, "carts");
module.exports = Cart;
