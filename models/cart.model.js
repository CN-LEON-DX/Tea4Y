
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
    
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Carts", cartSchema, "carts");
module.exports = Cart;
