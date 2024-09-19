const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // userID: String,
    cartID: String,
    userInfo: {
      fullName: String,
      address: String,
      phone: String,
      email: String,
      additionalInfo: String,
    },
    products: [
      {
        productID: String,
        quantity: Number,
        price: Number,
        discountPercentage: Number,
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Orders", orderSchema, "orders");
module.exports = Order;
